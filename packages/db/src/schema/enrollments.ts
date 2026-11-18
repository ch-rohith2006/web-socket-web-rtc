
import {pgTable,text,timestamp,uniqueIndex,} from "drizzle-orm/pg-core";
import { studentProfile } from "./student";
import { course } from "./course";

// Student Course Enrollment
export const enrollment = pgTable("enrollment",
  {
    id: text("id").primaryKey(),
    studentId: text("student_id").notNull().references(() => studentProfile.id, {onDelete: "cascade",}),
    courseId: text("course_id").notNull().references(() => course.id, {onDelete: "cascade",}),
    enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
    status: text("status")
      .$type<"active" | "completed" | "cancelled">()
      .default("active")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),},
  (table) => [
    uniqueIndex("student_course_unique").on(
      table.studentId,
      table.courseId
    ),
  ]
);
