
import {pgTable,text,timestamp,integer,boolean,uniqueIndex,} from "drizzle-orm/pg-core";

import { studentProfile } from "./student";
import { quiz } from "./quiz";

// 1. Quiz Results / Student Attempts
export const quizResult = pgTable("quiz_result", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull().references(() => studentProfile.id, {onDelete: "cascade",}),
  quizId: text("quiz_id").notNull().references(() => quiz.id, {onDelete: "cascade",}),
  attemptNumber: integer("attempt_number").default(1).notNull(),
  obtainedMarks: integer("obtained_marks").default(0).notNull(),
  totalMarks: integer("total_marks").notNull(),
  percentage: integer("percentage").default(0).notNull(),
  isPassed: boolean("is_passed").default(false).notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
