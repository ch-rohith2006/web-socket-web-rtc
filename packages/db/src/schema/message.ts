
import {pgTable,text,timestamp,boolean,index,} from "drizzle-orm/pg-core";
import { user } from "./auth";

// 1. Conversation
export const conversation = pgTable("conversation", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Conversation Participants
export const conversationParticipant = pgTable("conversation_participant",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id").notNull().references(() => conversation.id, {
    onDelete: "cascade",
      }),
    userId: text("user_id").notNull().references(() => user.id, {
        onDelete: "cascade",
      }),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    index("conversation_participant_user_idx").on(table.userId),
  ]
);

// 3. Messages
export const message = pgTable(
  "message",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id").notNull().references(() => conversation.id, {
        onDelete: "cascade",
      }),
    senderId: text("sender_id").notNull().references(() => user.id, {
        onDelete: "cascade",
      }),
    content: text("content").notNull(),
    attachmentUrl: text("attachment_url"),
    isRead: boolean("is_read").default(false).notNull(),
    sentAt: timestamp("sent_at").defaultNow().notNull(),
    editedAt: timestamp("edited_at"),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("message_conversation_idx").on(
      table.conversationId,
      table.sentAt
    ),
  ]
);
