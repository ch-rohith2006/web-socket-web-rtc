
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Mail,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  UserCheck,
} from "lucide-react";

type Student = {
  id: number;
  name: string;
  email: string;
  initials: string;
  course: string;
  progress: number;
  enrolled: string;
  status: "Active" | "Inactive";
};

const students: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    initials: "AS",
    course: "Full Stack Web Development",
    progress: 85,
    enrolled: "Oct 12, 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Reddy",
    email: "priya@example.com",
    initials: "PR",
    course: "UI/UX Design Fundamentals",
    progress: 72,
    enrolled: "Oct 15, 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    initials: "RK",
    course: "Advanced React Development",
    progress: 48,
    enrolled: "Oct 18, 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@example.com",
    initials: "SP",
    course: "Full Stack Web Development",
    progress: 91,
    enrolled: "Oct 20, 2026",
    status: "Active",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    initials: "VS",
    course: "Database Management",
    progress: 20,
    enrolled: "Oct 22, 2026",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Ananya Rao",
    email: "ananya@example.com",
    initials: "AR",
    course: "UI/UX Design Fundamentals",
    progress: 64,
    enrolled: "Oct 25, 2026",
    status: "Active",
  },
];

const courseFilters = [
  "All Courses",
  "Full Stack Web Development",
  "UI/UX Design Fundamentals",
  "Advanced React Development",
  "Database Management",
];

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchesCourse =
        courseFilter === "All Courses" ||
        student.course === courseFilter;

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [search, courseFilter, statusFilter]);

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const averageProgress = Math.round(
    students.reduce((total, student) => total + student.progress, 0) /
      students.length
  );

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Teacher Workspace
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              My Students
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View student profiles, track learning progress and manage your learners.
            </p>
          </div>

          <Link
            href="/teacher/students/invite"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Users size={18} />
            Invite Student
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Students"
            value={students.length}
            icon={<Users size={21} />}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Active Students"
            value={activeStudents}
            icon={<UserCheck size={21} />}
            color="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Courses"
            value={courseFilters.length - 1}
            icon={<BookOpen size={21} />}
            color="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Average Progress"
            value={`${averageProgress}%`}
            icon={<TrendingUp size={21} />}
            color="bg-orange-50 text-orange-600"
          />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative md:col-span-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              {courseFilters.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Student Directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage your enrolled students.
              </p>
            </div>
            <span className="text-sm font-medium text-slate-500">
              {filteredStudents.length} students found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Student</th>
                  <th className="px-6 py-4 font-semibold">Course</th>
                  <th className="px-6 py-4 font-semibold">Progress</th>
                  <th className="px-6 py-4 font-semibold">Enrolled</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center text-sm text-slate-500"
                    >
                      No students found. Try changing your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                            {student.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {student.name}
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              <Mail size={12} />
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">
                          {student.course}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="w-32">
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="font-semibold text-slate-700">
                              {student.progress}%
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {student.enrolled}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            student.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/teacher/students/${student.id}`}
                            aria-label={`View ${student.name}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye size={17} />
                          </Link>
                          <button
                            type="button"
                            aria-label={`More options for ${student.name}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100"
                          >
                            <MoreHorizontal size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom note */}
        <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <GraduationCap className="shrink-0 text-blue-600" size={22} />
          <p className="text-sm text-blue-800">
            Keep track of student progress and support learners who need extra guidance.
          </p>
          <ArrowUpRight className="ml-auto shrink-0 text-blue-600" size={18} />
        </div>

        <p className="text-center text-xs text-slate-400">
          Student information displayed here is sample data.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`rounded-xl p-3 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
