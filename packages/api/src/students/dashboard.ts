
import { and, desc, eq, gte, inArray } from "drizzle-orm";

import type { Database } from "@web-socket-web-rtc/db";

import { user } from "@web-socket-web-rtc/db/schema/auth";
import {
  studentProfile,
  studentProgress,
} from "@web-socket-web-rtc/db/schema/student";
import { enrollment } from "@web-socket-web-rtc/db/schema/enrollments";
import { course } from "@web-socket-web-rtc/db/schema/course";
import { liveClass } from "@web-socket-web-rtc/db/schema/live-class";
import { assignment } from "@web-socket-web-rtc/db/schema/assignments";
import { certificate } from "@web-socket-web-rtc/db/schema/certificates";
import { notification } from "@web-socket-web-rtc/db/schema/notifications";

import type { StudentDashboardResponse } from "../../schemas/student/dashboard.schema";

type DashboardDependencies = {
  db: Database;
  userId: string;
};

export async function getStudentDashboard({
  db,
  userId,
}: DashboardDependencies): Promise<StudentDashboardResponse> {
  const now = new Date();

  // 1. Get student profile
  const [student] = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      profileId: studentProfile.id,
    })
    .from(user)
    .innerJoin(studentProfile, eq(studentProfile.userId, user.id))
    .where(eq(user.id, userId))
    .limit(1);

  if (!student) {
    throw new Error("Student profile not found");
  }

  const profileId = student.profileId;

  // 2. Get enrolled courses
  const enrollments = await db
    .select({
      courseId: course.id,
      title: course.title,
      category: course.category,
      thumbnail: course.thumbnail,
      instructorName: user.name,
    })
    .from(enrollment)
    .innerJoin(course, eq(enrollment.courseId, course.id))
    .innerJoin(user, eq(course.teacherId, user.id))
    .where(
      and(
        eq(enrollment.studentId, profileId),
        eq(enrollment.status, "active")
      )
    );

  const courseIds = enrollments.map((item) => item.courseId);

  // 3. Get progress for enrolled courses
  const progressRows = courseIds.length
    ? await db
        .select({
          courseId: studentProgress.courseId,
          completedLessons: studentProgress.completedLessons,
          totalLessons: studentProgress.totalLessons,
          progressPercentage: studentProgress.progressPercentage,
        })
        .from(studentProgress)
        .where(
          and(
            eq(studentProgress.studentId, profileId),
            inArray(studentProgress.courseId, courseIds)
          )
        )
    : [];

  const progressMap = new Map(
    progressRows.map((item) => [item.courseId, item])
  );

  // 4. Build course list
  const courses = enrollments.map((item) => {
    const progress = progressMap.get(item.courseId);
    const percentage = progress?.progressPercentage ?? 0;

    return {
      id: item.courseId,
      title: item.title,
      category: item.category,
      thumbnail: item.thumbnail,
      instructorName: item.instructorName,
      progress: percentage,
      status:
        percentage >= 100
          ? ("completed" as const)
          : percentage > 0
            ? ("in-progress" as const)
            : ("not-started" as const),
    };
  });

  // 5. Calculate learning progress
  const completed = courses.filter(
    (item) => item.status === "completed"
  ).length;

  const inProgress = courses.filter(
    (item) => item.status === "in-progress"
  ).length;

  const notStarted = courses.filter(
    (item) => item.status === "not-started"
  ).length;

  const overallProgress = courses.length
    ? Math.round(
        courses.reduce((total, item) => total + item.progress, 0) /
          courses.length
      )
    : 0;

  const lessonsCompleted = progressRows.reduce(
    (total, item) => total + item.completedLessons,
    0
  );

  // 6. Get upcoming live classes
  const upcomingClasses = courseIds.length
    ? await db
        .select({
          id: liveClass.id,
          title: liveClass.title,
          courseTitle: course.title,
          instructorName: user.name,
          scheduledAt: liveClass.scheduledAt,
          meetingUrl: liveClass.meetingUrl,
        })
        .from(liveClass)
        .innerJoin(course, eq(liveClass.courseId, course.id))
        .innerJoin(user, eq(liveClass.teacherId, user.id))
        .where(
          and(
            inArray(liveClass.courseId, courseIds),
            eq(liveClass.status, "scheduled"),
            gte(liveClass.scheduledAt, now)
          )
        )
        .orderBy(liveClass.scheduledAt)
        .limit(5)
    : [];

  // 7. Get published assignments
  const assignments = courseIds.length
    ? await db
        .select({
          id: assignment.id,
          title: assignment.title,
          courseTitle: course.title,
          dueDate: assignment.dueDate,
        })
        .from(assignment)
        .innerJoin(course, eq(assignment.courseId, course.id))
        .where(
          and(
            inArray(assignment.courseId, courseIds),
            eq(assignment.isPublished, true)
          )
        )
        .orderBy(assignment.dueDate)
        .limit(10)
    : [];

  // 8. Get recent notifications
  const recentNotifications = await db
    .select({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    })
    .from(notification)
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
    .limit(5);

  // 9. Get certificates
  const certificates = await db
    .select({ id: certificate.id })
    .from(certificate)
    .where(eq(certificate.studentId, profileId));

  return {
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      image: student.image,
    },

    stats: {
      enrolledCourses: enrollments.length,
      lessonsCompleted,
      hoursLearned: 0,
      certificatesEarned: certificates.length,
    },

    learningProgress: {
      overallProgress,
      inProgress,
      completed,
      notStarted,
    },

    courses,

    upcomingClasses: upcomingClasses.map((item) => ({
      ...item,
      scheduledAt: item.scheduledAt.toISOString(),
    })),

    pendingAssignments: assignments.map((item) => ({
      id: item.id,
      title: item.title,
      courseTitle: item.courseTitle,
      dueDate: item.dueDate?.toISOString() ?? null,
      status:
        item.dueDate && item.dueDate < now
          ? ("overdue" as const)
          : ("pending" as const),
    })),

    recentNotifications: recentNotifications.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    })),
  };
}
