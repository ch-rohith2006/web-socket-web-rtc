
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  Plus,
  Search,
  Users,
  Clock,
  CalendarDays,
  Trophy,
  Eye,
  MoreHorizontal,
  BookOpen,
  CheckCircle2,
  FileQuestion,
} from "lucide-react";

type Quiz = {
  id: number;
  title: string;
  course: string;
  questions: number;
  duration: number;
  totalStudents: number;
  attempts: number;
  averageScore: number;
  dueDate: string;
  status: "Published" | "Draft" | "Completed";
};

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals Quiz",
    course: "Full Stack Web Development",
    questions: 20,
    duration: 30,
    totalStudents: 48,
    attempts: 42,
    averageScore: 82,
    dueDate: "Nov 18, 2026",
    status: "Published",
  },
  {
    id: 2,
    title: "React Hooks Assessment",
    course: "Advanced React Development",
    questions: 25,
    duration: 45,
    totalStudents: 52,
    attempts: 38,
    averageScore: 76,
    dueDate: "Nov 20, 2026",
    status: "Published",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    course: "UI/UX Design Fundamentals",
    questions: 15,
    duration: 25,
    totalStudents: 32,
    attempts: 32,
    averageScore: 88,
    dueDate: "Nov 12, 2026",
    status: "Completed",
  },
  {
    id: 4,
    title: "SQL and Database Quiz",
    course: "Database Management",
    questions: 20,
    duration: 30,
    totalStudents: 28,
    attempts: 0,
    averageScore: 0,
    dueDate: "Nov 25, 2026",
    status: "Draft",
  },
  {
    id: 5,
    title: "HTML and CSS Assessment",
    course: "Full Stack Web Development",
    questions: 18,
    duration: 30,
    totalStudents: 48,
    attempts: 45,
    averageScore: 79,
    dueDate: "Nov 16, 2026",
    status: "Published",
  },
];

const filters = ["All", "Published", "Draft", "Completed"];

export default function TeacherQuizzesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(search.toLowerCase()) ||
        quiz.course.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || quiz.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const publishedCount = quizzes.filter(
    (quiz) => quiz.status === "Published"
  ).length;

  const totalAttempts = quizzes.reduce(
    (total, quiz) => total + quiz.attempts,
    0
  );

  const scoredQuizzes = quizzes.filter((quiz) => quiz.attempts > 0);

  const averageScore = scoredQuizzes.length
    ? Math.round(
        scoredQuizzes.reduce((total, quiz) => total + quiz.averageScore, 0) /
          scoredQuizzes.length
      )
    : 0;

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
              Quizzes
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Create quizzes, evaluate students and monitor their performance.
            </p>
          </div>

          <Link
            href="/teacher/quizzes/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Quiz
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Quizzes"
            value={quizzes.length}
            icon={<ClipboardCheck size={21} />}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Published Quizzes"
            value={publishedCount}
            icon={<CheckCircle2 size={21} />}
            color="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Total Attempts"
            value={totalAttempts}
            icon={<Users size={21} />}
            color="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Average Score"
            value={`${averageScore}%`}
            icon={<Trophy size={21} />}
            color="bg-orange-50 text-orange-600"
          />
        </div>

        {/* Search and Filters */}
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
                placeholder="Search quizzes..."
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

        {/* Quiz List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Quizzes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage assessments across your courses.
              </p>
            </div>
            <span className="text-sm text-slate-500">
              {filteredQuizzes.length} quizzes found
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredQuizzes.length === 0 ? (
              <div className="py-14 text-center">
                <FileQuestion className="mx-auto text-slate-400" size={36} />
                <h3 className="mt-3 font-semibold text-slate-800">
                  No quizzes found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search or filter.
                </p>
              </div>
            ) : (
              filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FileQuestion size={23} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {quiz.title}
                          </h3>
                          <StatusBadge status={quiz.status} />
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          {quiz.course}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <BookOpen size={14} />
                            {quiz.questions} Questions
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {quiz.duration} Minutes
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users size={14} />
                            {quiz.attempts}/{quiz.totalStudents} Attempts
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {quiz.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <Link
                        href={`/teacher/quizzes/${quiz.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        <Eye size={16} />
                        View Quiz
                      </Link>

                      <button
                        type="button"
                        aria-label={`More options for ${quiz.title}`}
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Quiz Performance */}
                  <div className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-slate-500">Student Attempts</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {quiz.attempts}/{quiz.totalStudents}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Average Score</p>
                      <p className="mt-1 text-lg font-bold text-emerald-600">
                        {quiz.attempts > 0 ? `${quiz.averageScore}%` : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Completion Rate</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {quiz.totalStudents > 0
                          ? `${Math.round(
                              (quiz.attempts / quiz.totalStudents) * 100
                            )}%`
                          : "0%"}
                      </p>
                    </div>

                    <div className="sm:col-span-3">
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${
                              quiz.totalStudents > 0
                                ? (quiz.attempts / quiz.totalStudents) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Quiz information displayed here is sample data.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Quiz["status"] }) {
  const styles = {
    Published: "bg-emerald-50 text-emerald-700",
    Draft: "bg-slate-100 text-slate-600",
    Completed: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
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
