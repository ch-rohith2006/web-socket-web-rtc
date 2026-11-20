import {pgTable,text,timestamp,boolean,integer} from "drizzle-orm/pg-core";
import { course } from "./course";

//quizzes table
export const quiz = pgTable("quiz", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => course.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  totalMarks: integer("total_marks").default(0).notNull(),
  passingMarks: integer("passing_marks").default(0).notNull(),
  durationMinutes: integer("duration_minutes"),
  isPublished: boolean("is_published").default(false).notNull(),
createdAt: timestamp("created_at").defaultNow().notNull(),
updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//quiz questions

export const quizQuestion = pgTable("quiz_question", {
  id: text("id").primaryKey(),
  quizId: text("quiz_id").notNull().references(() => quiz.id, { onDelete: "cascade" }),
  questionType: text("question_type")
    .$type<"multiple_choice" | "true_false" | "short_answer">()
    .default("multiple_choice").notNull(),
  marks: integer("marks").default(1).notNull(),
  position: integer("position").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//quiz answers

export const quizAnswer = pgTable("quiz_answer", {
  id: text("id").primaryKey(),
  quizQuestionId: text("quiz_question_id").notNull().references(() => quizQuestion.id, { onDelete: "cascade" }),
  optionText: text("option_text").notNull(),
  isCorrect: boolean("is_correct").default(false).notNull(),
  position: integer("position").default(0).notNull(),
});
