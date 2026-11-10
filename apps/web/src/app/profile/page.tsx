
"use client";

import { useState } from "react";
import Link from "next/link";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Edit3,
  Save,
  X,
  BookOpen,
  GraduationCap,
  Clock3,
  Trophy,
  Award,
  CheckCircle2,
  ArrowRight,
  Camera,
  ShieldCheck,
  Settings,
} from "lucide-react";

/* -------------------- Profile Type -------------------- */

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  bio: string;
};

/* -------------------- Sample Profile Data -------------------- */

const initialProfile: Profile = {
  fullName: "Student Name",
  email: "student@example.com",
  phone: "+91 98765 43210",
  location: "Hyderabad, India",
  role: "Student",
  bio: "I am passionate about learning new technologies, improving my skills and building creative projects.",
};

/* -------------------- Learning Data -------------------- */

const learningStats = [
  {
    title: "Enrolled Courses",
    value: "6",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Completed Courses",
    value: "2",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Learning Hours",
    value: "18",
    icon: Clock3,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Certificates",
    value: "2",
    icon: Trophy,
    color: "bg-amber-100 text-amber-600",
  },
];

const learningCourses = [
  {
    name: "UI/UX Design Fundamentals",
    instructor: "Jane Cooper",
    progress: 75,
    color: "bg-blue-600",
  },
  {
    name: "Python Programming",
    instructor: "Robert Fox",
    progress: 60,
    color: "bg-purple-600",
  },
  {
    name: "Digital Marketing Strategy",
    instructor: "Albert Flores",
    progress: 40,
    color: "bg-emerald-600",
  },
];

/* -------------------- Profile Page -------------------- */

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const initials = profile.fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  /* -------------------- Edit Profile -------------------- */

  const handleEdit = () => {
    setDraftProfile(profile);
    setIsSaved(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProfile(draftProfile);
    setIsEditing(false);
    setIsSaved(true);
  };

  const updateField = (field: keyof Profile, value: string) => {
    setDraftProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* ================= PAGE HEADER ================= */}

      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Your Account
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and learning activities.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Edit3 size={17} />
            Edit Profile
          </button>
        )}

      </header>

      {/* ================= PROFILE BANNER ================= */}

      <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-600 p-6 text-white shadow-lg md:p-8">

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* Avatar */}

          <div className="relative w-fit shrink-0">

            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-3xl font-bold text-white shadow-lg">
              {initials || "S"}
            </div>

            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-700 bg-emerald-500 text-white">
              <CheckCircle2 size={17} />
            </div>

          </div>

          {/* Profile Information */}

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-2xl font-bold md:text-3xl">
                {profile.fullName}
              </h2>

              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {profile.role}
              </span>

            </div>

            <p className="mt-2 text-sm text-blue-100">
              {profile.bio}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-blue-100">

              <span className="flex items-center gap-2">
                <Mail size={15} />
                {profile.email}
              </span>

              <span className="flex items-center gap-2">
                <MapPin size={15} />
                {profile.location || "Location not added"}
              </span>

            </div>

          </div>

          {/* Account Badge */}

          <div className="flex shrink-0 items-center gap-2 self-start rounded-xl bg-white/15 px-4 py-3 sm:self-center">
            <ShieldCheck size={20} />

            <div>
              <p className="text-sm font-semibold">
                Student Account
              </p>

              <p className="text-[10px] text-blue-100">
                Learning Member
              </p>
            </div>
          </div>

        </div>

        <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-white/10" />

      </section>

      {/* ================= SUCCESS MESSAGE ================= */}

      {isSaved && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
          <CheckCircle2 size={19} />
          Profile information updated successfully.
        </div>
      )}

      {/* ================= LEARNING STATISTICS ================= */}

      <section className="mb-8">

        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Learning Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your learning achievements at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {learningStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={22} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {stat.title}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* ================= PERSONAL INFORMATION ================= */}

      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Personal Information */}

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6 xl:col-span-2">

          <div className="mb-6 flex items-center justify-between gap-3">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your basic account information.
              </p>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={handleEdit}
                aria-label="Edit personal information"
                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
              >
                <Edit3 size={19} />
              </button>
            )}

          </div>

          {/* Editable Form */}

          {isEditing ? (

            <form onSubmit={handleSave} className="space-y-5">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Full Name */}

                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    required
                    value={draftProfile.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    value={draftProfile.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Phone */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={draftProfile.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

             

              </div>

              {/* Bio */}

              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  About Me
                </label>

                <textarea
                  id="bio"
                  rows={4}
                  value={draftProfile.bio}
                  onChange={(event) =>
                    updateField("bio", event.target.value)
                  }
                  className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Write something about yourself..."
                />
              </div>

              {/* Edit Actions */}

              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Save size={17} />
                  Save Changes
                </button>

              </div>

            </form>

          ) : (

            /* Read-only Profile Details */

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <UserRound size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                    {profile.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Mail size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Email Address
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                    {profile.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Phone Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {profile.phone || "Not added"}
                  </p>
                </div>
              </div>

           

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <GraduationCap size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Account Role
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {profile.role}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Member Since
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    November 2026
                  </p>
                </div>
              </div>

              {/* Bio */}

              <div className="border-t border-slate-100 pt-5 sm:col-span-2">
                <p className="text-xs text-slate-400">
                  About Me
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {profile.bio || "No description added yet."}
                </p>
              </div>

            </div>

          )}

        </section>

        {/* Account Information */}

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your account details.
            </p>
          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Account Status
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  Active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <GraduationCap size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Account Type
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Student Account
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <BookOpen size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Learning Platform
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  WebRTC Learning
                </p>
              </div>
            </div>

          </div>

          <div className="mt-7 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-slate-500" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Account Settings
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Manage your learning account.
                </p>
              </div>
            </div>
          </div>

        </section>

      </div>

      {/* ================= MY LEARNING PROGRESS ================= */}

      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              My Learning Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your ongoing course progress.
            </p>
          </div>

          <Link
            href="/my-learning"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View My Learning
            <ArrowRight size={16} />
          </Link>

        </div>

        <div className="space-y-6">

          {learningCourses.map((course) => (

            <div key={course.name}>

              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {course.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Instructor: {course.instructor}
                  </p>
                </div>

                <span className="text-sm font-bold text-slate-800">
                  {course.progress}%
                </span>

              </div>

              <div
                className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${course.name} progress`}
                aria-valuenow={course.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full ${course.color}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================= CERTIFICATES ================= */}

      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-5 flex items-center justify-between gap-3">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              My Achievements
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your completed courses and certificates.
            </p>
          </div>

          <Link
            href="/certificates"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View All
          </Link>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Award size={25} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Introduction to Web Development
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Certificate earned · October 18, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Trophy size={25} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                JavaScript Fundamentals
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Certificate earned · September 30, 2026
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ================= QUICK LINKS ================= */}

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <Link
          href="/messages"
          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Mail size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Contact Lecturers
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Get help with your courses.
              </p>
            </div>
          </div>

          <ArrowRight size={18} className="text-slate-400" />
        </Link>

        <Link
          href="/certificates"
          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Award size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                View Certificates
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Explore your achievements.
              </p>
            </div>
          </div>

          <ArrowRight size={18} className="text-slate-400" />
        </Link>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

    </div>
  );
}
