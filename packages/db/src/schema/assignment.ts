
import {pgTable,text,timestamp,integer,boolean,} from "drizzle-orm/pg-core";

import { course } from "./course";
import { user } from "./auth";

// 1. Assignment
export const assignment = pgTable("assignment", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => course.id, { onDelete: "cascade" }),
  teacherId: text("teacher_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  attachmentUrl: text("attachment_url"),
  totalMarks: integer("total_marks").default(100).notNull(),
  dueDate: timestamp("due_date"),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Student Assignment Submission
export const assignmentSubmission = pgTable("assignment_submission",{
    id: text("id").primaryKey(),
    assignmentId: text("assignment_id").notNull().references(() => assignment.id, { onDelete: "cascade" }),
    studentId: text("student_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    submissionText: text("submission_text"),
    submissionUrl: text("submission_url"),
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),
    marksObtained: integer("marks_obtained"),
    feedback: text("feedback"),
    status: text("status")
      .$type<"submitted" | "graded" | "late" | "resubmitted">()
      .default("submitted")
      .notNull(),
    gradedAt: timestamp("graded_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);
