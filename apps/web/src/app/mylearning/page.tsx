
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  BookOpen,
  GraduationCap,
  Clock3,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  Filter,
  Trophy,
  Video,
  Award,
  CalendarDays,
  User,
} from "lucide-react";

/* -------------------- Course Data -------------------- */

const courses = [
  {
    id: 1,
    title: "UI/UX Design Fundamentals",
    instructor: "Jane Cooper",
    category: "Design",
    lessons: "18 / 24 lessons",
    progress: 75,
    duration: "12 hours",
    status: "In Progress",
    icon: GraduationCap,
    gradient: "from-indigo-800 to-blue-500",
  },
  {
    id: 2,
    title: "Python Programming for Beginners",
    instructor: "Robert Fox",
    category: "Programming",
    lessons: "12 / 20 lessons",
    progress: 60,
    duration: "16 hours",
    status: "In Progress",
    icon: BookOpen,
    gradient: "from-slate-900 to-cyan-600",
  },
  {
    id: 3,
    title: "Digital Marketing Strategy",
    instructor: "Albert Flores",
    category: "Marketing",
    lessons: "8 / 20 lessons",
    progress: 40,
    duration: "10 hours",
    status: "In Progress",
    icon: Video,
    gradient: "from-blue-500 to-indigo-400",
  },
  {
    id: 4,
    title: "Photography Masterclass",
    instructor: "Brooklyn Simmons",
    category: "Photography",
    lessons: "0 / 15 lessons",
    progress: 0,
    duration: "8 hours",
    status: "Not Started",
    icon: GraduationCap,
    gradient: "from-slate-500 to-slate-800",
  },
  {
    id: 5,
    title: "Introduction to Web Development",
    instructor: "Cody Fisher",
    category: "Development",
    lessons: "20 / 20 lessons",
    progress: 100,
    duration: "14 hours",
    status: "Completed",
    icon: BookOpen,
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    id: 6,
    title: "JavaScript Fundamentals",
    instructor: "Kristin Watson",
    category: "Programming",
    lessons: "16 / 16 lessons",
    progress: 100,
    duration: "9 hours",
    status: "Completed",
    icon: BookOpen,
    gradient: "from-orange-500 to-amber-500",
  },
];

/* -------------------- Certificate Data -------------------- */

const certificates = [
  {
    id: "CERT-2026-001",
    course: "Introduction to Web Development",
    instructor: "Cody Fisher",
    issuedOn: "October 18, 2026",
  },
  {
    id: "CERT-2026-002",
    course: "JavaScript Fundamentals",
    instructor: "Kristin Watson",
    issuedOn: "September 30, 2026",
  },
];

/* -------------------- Filters -------------------- */

const filters = [
  "All Courses",
  "In Progress",
  "Completed",
  "Not Started",
];

export default function MyLearningPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Courses");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesFilter =
        activeFilter === "All Courses" ||
        course.status === activeFilter;

      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const completedCount = courses.filter(
    (course) => course.status === "Completed"
  ).length;

  const inProgressCount = courses.filter(
    (course) => course.status === "In Progress"
  ).length;

  const totalProgress = Math.round(
    courses.reduce((sum, course) => sum + course.progress, 0) /
      courses.length
  );

  const continueCourse = courses.find(
    (course) => course.status === "In Progress"
  );

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* ================= HEADER ================= */}

      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Your Learning Journey
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            My Learning
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your courses and track your learning progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-none">
            <Search size={18} className="text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your courses..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-48"
            />
          </div>

          <Link
            href="/courses"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Courses
          </Link>

        </div>
      </header>

      {/* ================= STATISTICS ================= */}

      <section className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Enrolled Courses */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookOpen size={22} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {courses.length}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enrolled Courses
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <PlayCircle size={22} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {inProgressCount}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              In Progress
            </p>
          </div>

          {/* Completed Courses */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {completedCount}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Completed Courses
            </p>
          </div>

          {/* Average Progress */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Trophy size={22} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {totalProgress}%
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Average Progress
            </p>
          </div>

          {/* Certificates Earned */}
          <div className="rounded-2xl border border-purple-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Award size={22} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {certificates.length}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Certificates Earned
            </p>
          </div>

        </div>
      </section>

      {/* ================= CONTINUE LEARNING ================= */}

      {continueCourse && (
        <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg md:p-8">

          <div className="relative z-10 max-w-xl">

            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
              PICK UP WHERE YOU LEFT OFF
            </span>

            <h2 className="mt-5 text-2xl font-bold md:text-3xl">
              Continue Your Learning
            </h2>

            <p className="mt-2 text-sm text-blue-100">
              {continueCourse.title}
            </p>

            <div className="mb-5 mt-5 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${continueCourse.progress}%` }}
                />
              </div>

              <span className="text-sm font-bold">
                {continueCourse.progress}% Completed
              </span>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              <PlayCircle size={18} />
              Continue Learning
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-white/10" />

        </section>
      )}

      {/* ================= MY COURSES ================= */}

      <section className="mb-9">

        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              My Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              All your enrolled courses in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
              <Search size={16} className="text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses..."
                className="w-36 bg-transparent text-xs text-slate-700 outline-none sm:w-40"
              />
            </div>

            <Filter size={17} className="text-slate-400" />

            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {filter}
              </button>
            ))}

          </div>
        </div>

        {/* Course Cards */}

        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <BookOpen size={36} className="mx-auto mb-3 text-slate-400" />

            <h3 className="font-semibold text-slate-800">
              No courses found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or choose a different filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredCourses.map((course) => {
              const Icon = course.icon;

              return (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  {/* Course Cover */}
                  <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${course.gradient}`}>

                    <Icon size={64} className="text-white/90" />

                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        course.status === "Completed"
                          ? "bg-emerald-500 text-white"
                          : course.status === "Not Started"
                            ? "bg-white text-slate-700"
                            : "bg-blue-600 text-white"
                      }`}
                    >
                      {course.status}
                    </span>

                  </div>

                  {/* Course Details */}
                  <div className="p-5">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {course.category}
                    </p>

                    <h3 className="min-h-10 text-base font-bold leading-5 text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <User size={14} />
                      {course.instructor}
                    </p>

                    <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={14} />
                        {course.lessons}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {course.duration}
                      </span>
                    </div>

                    <div className="mb-2 mt-5 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        Learning Progress
                      </span>

                      <span className="text-xs font-bold text-slate-800">
                        {course.progress}%
                      </span>
                    </div>

                    <div
                      className="h-2 overflow-hidden rounded-full bg-slate-100"
                      role="progressbar"
                      aria-label={`${course.title} progress`}
                      aria-valuenow={course.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full rounded-full ${
                          course.status === "Completed"
                            ? "bg-emerald-500"
                            : "bg-blue-600"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <Link
                      href="/courses"
                      className={`mt-5 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                        course.status === "Completed"
                          ? "border border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                    >
                      {course.status === "Completed"
                        ? "Review Course"
                        : course.status === "Not Started"
                          ? "Start Learning"
                          : "Continue Learning"}

                      <ArrowRight size={16} />
                    </Link>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* ==================================================
          MY CERTIFICATES
          ADDED AFTER MY COURSES AND BEFORE BOTTOM BANNER
         ================================================== */}

      <section className="mb-8 rounded-2xl border border-purple-200 bg-white p-5 shadow-sm md:p-6">

        {/* Certificate Section Header */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Award size={26} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                My Certificates
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your achievements and completed course certificates.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3">
            <Award size={20} className="text-amber-600" />

            <span className="text-sm font-semibold text-amber-700">
              {certificates.length} Certificates Earned
            </span>
          </div>

        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {certificates.map((certificate) => (

            <article
              key={certificate.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_1fr]">

                {/* Certificate Preview */}
                <div className="flex min-h-[230px] flex-col justify-between overflow-hidden rounded-lg border-4 border-double border-amber-300 bg-gradient-to-br from-amber-50 via-white to-blue-50 p-4 text-center">

                  <div className="flex items-center justify-between">
                    <div className="h-5 w-5 border-l-2 border-t-2 border-amber-400" />

                    <Award size={25} className="text-amber-500" />

                    <div className="h-5 w-5 border-r-2 border-t-2 border-amber-400" />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-700">
                      WebRTC Learning Academy
                    </p>

                    <h3 className="mt-3 font-serif text-2xl font-bold text-slate-800">
                      Certificate
                    </h3>

                    <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
                      Of Completion
                    </p>

                    <div className="mx-auto my-3 h-px max-w-40 bg-amber-300" />

                    <p className="text-[10px] text-slate-500">
                      This certificate is awarded for successfully completing
                    </p>

                    <h4 className="mt-2 text-sm font-bold text-blue-800">
                      {certificate.course}
                    </h4>

                    <p className="mt-2 text-[10px] text-slate-500">
                      {certificate.instructor}
                    </p>
                  </div>

                  <div className="flex items-end justify-between border-t border-amber-200 pt-2">

                    <div className="text-left">
                      <p className="text-[8px] text-slate-400">
                        ISSUE DATE
                      </p>

                      <p className="text-[9px] font-semibold text-slate-700">
                        {certificate.issuedOn}
                      </p>
                    </div>

                    <Award size={32} className="text-amber-500" />

                    <div className="text-right">
                      <p className="text-[8px] text-slate-400">
                        STATUS
                      </p>

                      <p className="text-[9px] font-bold text-emerald-600">
                        COMPLETED
                      </p>
                    </div>

                  </div>
                </div>

                {/* Certificate Information */}
                <div className="flex flex-col justify-center">

                  <span className="mb-3 w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <span className="mr-1">✓</span>
                    Successfully Completed
                  </span>

                  <h3 className="text-base font-bold leading-6 text-slate-900">
                    {certificate.course}
                  </h3>

                  <div className="mt-5 space-y-4">

                    <div className="flex items-center gap-3">
                      <User size={17} className="shrink-0 text-blue-600" />

                      <div>
                        <p className="text-[10px] uppercase text-slate-400">
                          Instructor
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {certificate.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays size={17} className="shrink-0 text-blue-600" />

                      <div>
                        <p className="text-[10px] uppercase text-slate-400">
                          Issued On
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {certificate.issuedOn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BookOpen size={17} className="shrink-0 text-blue-600" />

                      <div>
                        <p className="text-[10px] uppercase text-slate-400">
                          Certificate ID
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {certificate.id}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

{/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

    </div>
  );
}
  