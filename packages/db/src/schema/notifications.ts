
import {pgTable,text,timestamp,boolean,} from "drizzle-orm/pg-core";
import { user } from "./auth";

// Notifications
export const notification = pgTable("notification", {
  id: text("id").primaryKey(),

  // Who receives this notification?
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  message: text("message").notNull(),
  // Type of notification
  type: text("type")
    .$type<
      | "assignment"
      | "submission"
      | "grade"
      | "live_class"
      | "course"
      | "announcement"
      | "general"
    >()
    .default("general")
    .notNull(),

  // Optional related record
  relatedId: text("related_id"),
  
  // Has the user read it?
  isRead: boolean("is_read").default(false).notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
