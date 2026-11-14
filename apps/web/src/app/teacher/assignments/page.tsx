
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Plus,
  Search,
  Users,
  Clock,
  CalendarDays,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  MoreHorizontal,
  BookOpen,
} from "lucide-react";

type Assignment = {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  totalStudents: number;
  submitted: number;
  graded: number;
  status: "Active" | "Completed" | "Draft";
};

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Build a Responsive Portfolio Website",
    course: "Full Stack Web Development",
    description: "Create a responsive personal portfolio using HTML, CSS and React.",
    dueDate: "Nov 18, 2026",
    totalStudents: 48,
    submitted: 36,
    graded: 28,
    status: "Active",
  },
  {
    id: 2,
    title: "UI Design Case Study",
    course: "UI/UX Design Fundamentals",
    description: "Prepare a case study with wireframes and a final prototype.",
    dueDate: "Nov 20, 2026",
    totalStudents: 32,
    submitted: 25,
    graded: 20,
    status: "Active",
  },
  {
    id: 3,
    title: "React Hooks Practical",
    course: "Advanced React Development",
    description: "Build a small application using React hooks.",
    dueDate: "Nov 12, 2026",
    totalStudents: 40,
    submitted: 40,
    graded: 40,
    status: "Completed",
  },
  {
    id: 4,
    title: "Database Design Assignment",
    course: "Database Management",
    description: "Design a relational database and write SQL queries.",
    dueDate: "Nov 25, 2026",
    totalStudents: 28,
    submitted: 0,
    graded: 0,
    status: "Draft",
  },
  {
    id: 5,
    title: "JavaScript Fundamentals Quiz",
    course: "Full Stack Web Development",
    description: "Complete the JavaScript fundamentals assessment.",
    dueDate: "Nov 16, 2026",
    totalStudents: 48,
    submitted: 42,
    graded: 35,
    status: "Active",
  },
];

const filters = ["All", "Active", "Completed", "Draft"];

export default function TeacherAssignmentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(search.toLowerCase()) ||
        assignment.course.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || assignment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalSubmissions = assignments.reduce(
    (total, assignment) => total + assignment.submitted,
    0
  );

  const totalGraded = assignments.reduce(
    (total, assignment) => total + assignment.graded,
    0
  );

  const pendingGrading = totalSubmissions - totalGraded;

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
              Assignments
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Create assignments, review submissions and track student performance.
            </p>
          </div>

          <Link
            href="/teacher/assignments/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Assignment
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Assignments"
            value={assignments.length}
            icon={<ClipboardList size={21} />}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Total Submissions"
            value={totalSubmissions}
            icon={<FileCheck size={21} />}
            color="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Pending Grading"
            value={pendingGrading}
            icon={<AlertCircle size={21} />}
            color="bg-orange-50 text-orange-600"
          />
          <StatCard
            title="Graded Submissions"
            value={totalGraded}
            icon={<CheckCircle2 size={21} />}
            color="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Pending grading notice */}
        {pendingGrading > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-3 text-orange-600">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-orange-900">
                  Submissions need your attention
                </h3>
                <p className="mt-1 text-sm text-orange-700">
                  You have {pendingGrading} submissions waiting for grading.
                </p>
              </div>
            </div>
            <Link
              href="/teacher/assignments/submissions"
              className="text-sm font-semibold text-orange-800 hover:underline"
            >
              Review submissions →
            </Link>
          </div>
        )}

        {/* Search and filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assignments..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Assignment list */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Assignments
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage assignments across your courses.
              </p>
            </div>
            <span className="text-sm text-slate-500">
              {filteredAssignments.length} assignments found
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredAssignments.length === 0 ? (
              <div className="py-14 text-center">
                <ClipboardList className="mx-auto text-slate-400" size={36} />
                <h3 className="mt-3 font-semibold text-slate-800">
                  No assignments found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search or filter.
                </p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => {
                const submissionPercentage =
                  assignment.totalStudents > 0
                    ? Math.round(
                        (assignment.submitted / assignment.totalStudents) * 100
                      )
                    : 0;

                return (
                  <div
                    key={assignment.id}
                    className="p-5 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <BookOpen size={23} />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-slate-900">
                              {assignment.title}
                            </h3>
                            <StatusBadge status={assignment.status} />
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            {assignment.course}
                          </p>
                          <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            {assignment.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays size={14} />
                              Due: {assignment.dueDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users size={14} />
                              {assignment.totalStudents} Students
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={14} />
                              {assignment.submitted} Submitted
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                        <Link
                          href={`/teacher/assignments/${assignment.id}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          <Eye size={16} />
                          View Details
                        </Link>

                        <button
                          type="button"
                          aria-label={`More options for ${assignment.title}`}
                          className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Submission progress */}
                    <div className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-slate-500">Submission Rate</p>
                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {submissionPercentage}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Submitted</p>
                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {assignment.submitted}/{assignment.totalStudents}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Graded</p>
                        <p className="mt-1 text-lg font-bold text-emerald-600">
                          {assignment.graded}/{assignment.submitted}
                        </p>
                      </div>

                      <div className="sm:col-span-3">
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${submissionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Assignment information displayed here is sample data.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Assignment["status"];
}) {
  const styles = {
    Active: "bg-blue-50 text-blue-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Draft: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
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
