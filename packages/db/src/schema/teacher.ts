
import {pgTable,text,timestamp,integer,date,boolean,} from "drizzle-orm/pg-core";

import { user } from "./auth";

//  Teacher Profile
export const teacherProfile = pgTable("teacher_profile", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
  phone: text("phone"),
  bio: text("bio"),
  profileImage: text("profile_image"),
  designation: text("designation"),
  specialization: text("specialization"),
  experienceYears: integer("experience_years").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


//  Teacher Education
export const teacherEducation = pgTable("teacher_education", {
    id: text("id").primaryKey(),
    teacherId: text("teacher_id").notNull().references(() => teacherProfile.id, { onDelete: "cascade" }),
    institution: text("institution").notNull(),
    degree: text("degree"),
    fieldOfStudy: text("field_of_study"),
    startDate: date("start_date"),
    endDate: date("end_date"),
    isCurrentlyStudying: boolean("is_currently_studying").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });

  //Teacher experience
    export const teacherExperience = pgTable("teacher_experience", {
        id: text("id").primaryKey(),
        teacherId: text("teacher_id").notNull().references(() => teacherProfile.id, { onDelete: "cascade" }),
        orgination: text("organization").notNull(),
        jobTitle: text("job_title").notNull(),
        description: text("description"),
        startDate: date("start_date").notNull(),
        endDate: date("end_date"),
        isCurrentlyWorking: boolean("is_currently_working").default(false).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    });
    
    //Teacher Certification
    export const teacherCertification = pgTable("teacher_certification", {
        id: text("id").primaryKey(),
        teacherId: text("teacher_id").notNull().references(() => teacherProfile.id, { onDelete: "cascade" }),
        certificateName: text("certificate_name").notNull(),
        issuingOrganization: text("issuing_organization"),
        issueDate: date("issue_date"),
        expiryDate: date("expiry_date"),
       certificateUrl: text("certificate_url"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
});