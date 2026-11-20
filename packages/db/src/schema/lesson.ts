
import {pgTable,text,timestamp,integer,} from "drizzle-orm/pg-core";
import { course } from "./course";
import { user } from "./auth";

// Live Class
export const liveClass = pgTable("live_class", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => course.id, { onDelete: "cascade" }),
  teacherId: text("teacher_id").notNull().references(() => user.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  description: text("description"),

  meetingUrl: text("meeting_url"),

  scheduledAt: timestamp("scheduled_at").notNull(),

  durationMinutes: integer("duration_minutes")
    .default(60)
    .notNull(),

  status: text("status")
    .$type<"scheduled" | "live" | "completed" | "cancelled">()
    .default("scheduled")
    .notNull(),

  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});
