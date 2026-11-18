import {pgTable,text,timestamp,boolean,integer} from "drizzle-orm/pg-core";
import { user } from "./auth";

// Course table
export const course = pgTable("course", {
  id: text("id").primaryKey(),
  teacherId: text("teacher_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  category: text("category"),
  level: text("level"),
  price: integer("price").default(0).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



