
import { z } from "zod";

export const studentDashboardInputSchema = z.object({});

export const studentDashboardResponseSchema = z.object({
  student: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string().nullable(),
  }),

  stats: z.object({
    enrolledCourses: z.number(),
    lessonsCompleted: z.number(),
    hoursLearned: z.number(),
    certificatesEarned: z.number(),
  }),

  learningProgress: z.object({
    overallProgress: z.number(),
    inProgress: z.number(),
    completed: z.number(),
    notStarted: z.number(),
  }),

  courses: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      category: z.string().nullable(),
      thumbnail: z.string().nullable(),
      instructorName: z.string(),
      progress: z.number(),
      status: z.enum([
        "in-progress",
        "completed",
        "not-started",
      ]),
    })
  ),

  upcomingClasses: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      courseTitle: z.string(),
      instructorName: z.string(),
      scheduledAt: z.string(),
      meetingUrl: z.string().nullable(),
    })
  ),

  pendingAssignments: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      courseTitle: z.string(),
      dueDate: z.string().nullable(),
      status: z.enum(["pending", "overdue"]),
    })
  ),

  recentNotifications: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      message: z.string(),
      type: z.string(),
      isRead: z.boolean(),
      createdAt: z.string(),
    })
  ),
});

export type StudentDashboardInput = z.infer<
  typeof studentDashboardInputSchema
>;

export type StudentDashboardResponse = z.infer<
  typeof studentDashboardResponseSchema
>;
