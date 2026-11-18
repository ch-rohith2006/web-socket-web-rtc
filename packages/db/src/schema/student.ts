
import {pgTable,text,timestamp,boolean,integer,date,uniqueIndex,} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { course } from "./course";

//  Student Profile
export const studentProfile = pgTable("student_profile", {
id: text("id").primaryKey(),
userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),

phone: text("phone"),
dateOfBirth: date("date_of_birth"),
gender: text("gender"),
bio: text("bio"),
profileImage: text("profile_image"),
createdAt: timestamp("created_at").defaultNow().notNull(),
updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//  Student Address
export const studentAddress = pgTable("student_address", {
id: text("id").primaryKey(),
studentId: text("student_id").notNull().references(() => studentProfile.id, { onDelete: "cascade" }),
addressLine: text("address_line"),
city: text("city"),
state: text("state"),
country: text("country"),
postalCode: text("postal_code"),
createdAt: timestamp("created_at").defaultNow().notNull(),
});

//  Student Education
export const studentEducation = pgTable("student_education", {
id: text("id").primaryKey(),
studentId: text("student_id").notNull().references(() => studentProfile.id, { onDelete: "cascade" }),
institution: text("institution").notNull(),
degree: text("degree"),
fieldOfStudy: text("field_of_study"),
startDate: date("start_date"),
endDate: date("end_date"),
isCurrentlyStudying: boolean("is_currently_studying").default(false).notNull(),
createdAt: timestamp("created_at").defaultNow().notNull(),
});

//  Student Course Enrollment
export const studentEnrollment = pgTable("student_enrollment",{
id: text("id").primaryKey(),
studentId: text("student_id").notNull().references(() => studentProfile.id, { onDelete: "cascade" }),
courseId: text("course_id").notNull().references(() => course.id, { onDelete: "cascade" }),
enrollmentDate: timestamp("enrollment_date").defaultNow().notNull(),
status: text("status")
      .$type<"active" | "completed" | "cancelled">()
      .default("active")
      .notNull(),
createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("student_course_unique").on(
      table.studentId,
      table.courseId
    ),
  ]
);

//  Student Course Progress
export const studentProgress = pgTable("student_progress", {
id: text("id").primaryKey(),
studentId: text("student_id").notNull().references(() => studentProfile.id, { onDelete: "cascade" }),
courseId: text("course_id").notNull().references(() => course.id, { onDelete: "cascade" }),
completedLessons: integer("completed_lessons").default(0).notNull(),
totalLessons: integer("total_lessons").default(0).notNull(),
progressPercentage: integer("progress_percentage").default(0).notNull(),
lastAccessedAt: timestamp("last_accessed_at"),
updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
  