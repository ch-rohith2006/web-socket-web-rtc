
import {pgTable,text,timestamp,} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { course } from "./course";

// Student Certificates
export const certificate = pgTable("certificate", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  courseId: text("course_id").notNull().references(() => course.id, { onDelete: "cascade" }),
  certificateNumber: text("certificate_number").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
  certificateUrl: text("certificate_url"),
  issuedBy: text("issued_by").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
