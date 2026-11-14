
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Video,
  Plus,
  Search,
  CalendarDays,
  Clock,
  Users,
  ExternalLink,
  Play,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Radio,
} from "lucide-react";

type LiveClass = {
  id: number;
  title: string;
  course: string;
  date: string;
  time: string;
  duration: string;
  students: number;
  status: "Upcoming" | "Live" | "Completed";
  meetingLink: string;
};

const liveClasses: LiveClass[] = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    course: "Advanced React Development",
    date: "2026-11-16",
    time: "10:00 AM",
    duration: "60 min",
    students: 35,
    status: "Live",
    meetingLink: "https://meet.google.com/",
  },
  {
    id: 2,
    title: "Building Responsive Websites",
    course: "Full Stack Web Development",
    date: "2026-11-17",
    time: "11:30 AM",
    duration: "90 min",
    students: 48,
    status: "Upcoming",
    meetingLink: "https://meet.google.com/",
  },
  {
    id: 3,
    title: "UI Design Principles",
    course: "UI/UX Design Fundamentals",
    date: "2026-11-18",
    time: "02:00 PM",
    duration: "60 min",
    students: 29,
    status: "Upcoming",
    meetingLink: "https://meet.google.com/",
  },
  {
    id: 4,
    title: "Database Relationships",
    course: "Database Management",
    date: "2026-11-12",
    time: "10:00 AM",
    duration: "60 min",
    students: 40,
    status: "Completed",
    meetingLink: "https://meet.google.com/",
  },
];

const filters = ["All", "Live", "Upcoming", "Completed"];

export default function TeacherLiveClassPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredClasses = useMemo(() => {
    return liveClasses.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const liveCount = liveClasses.filter((item) => item.status === "Live").length;
  const upcomingCount = liveClasses.filter(
    (item) => item.status === "Upcoming"
  ).length;
  const totalStudents = liveClasses.reduce(
    (total, item) => total + item.students,
    0
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
              Live Classes
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Schedule, manage and conduct your online classes.
            </p>
          </div>

          <Link
            href="/teacher/liveclass/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Schedule Class
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Classes"
            value={liveClasses.length}
            icon={<Video size={21} />}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Live Now"
            value={liveCount}
            icon={<Radio size={21} />}
            color="bg-red-50 text-red-600"
          />
          <StatCard
            title="Upcoming Classes"
            value={upcomingCount}
            icon={<CalendarDays size={21} />}
            color="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Total Enrollments"
            value={totalStudents}
            icon={<Users size={21} />}
            color="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Live Class Highlight */}
        {liveCount > 0 && (
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white shadow-sm md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                  LIVE SESSION
                </span>
                <h2 className="mt-4 text-2xl font-bold">
                  {liveClasses.find((item) => item.status === "Live")?.title}
                </h2>
                <p className="mt-2 text-sm text-blue-100">
                  {liveClasses.find((item) => item.status === "Live")?.course}
                </p>
                <div className="mt-4 flex flex-wrap gap-5 text-sm text-blue-100">
                  <span className="flex items-center gap-2">
                    <Users size={16} />
                    {liveClasses.find((item) => item.status === "Live")?.students} students
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    Session in progress
                  </span>
                </div>
              </div>

              <a
                href={liveClasses.find((item) => item.status === "Live")?.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <Play size={17} />
                Join Class
              </a>
            </div>
          </div>
        )}

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
                placeholder="Search live classes..."
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

        {/* Classes List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Class Schedule
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage all your scheduled sessions.
              </p>
            </div>
            <CalendarDays className="text-slate-400" size={22} />
          </div>

          <div className="divide-y divide-slate-100">
            {filteredClasses.length === 0 ? (
              <div className="py-14 text-center">
                <Video className="mx-auto text-slate-400" size={36} />
                <p className="mt-3 font-semibold text-slate-800">
                  No classes found
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search or filter.
                </p>
              </div>
            ) : (
              filteredClasses.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-5 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Video size={23} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.course}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {item.time} · {item.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {item.students} students
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    {item.status !== "Completed" && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          item.status === "Live"
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <ExternalLink size={15} />
                        {item.status === "Live" ? "Join Class" : "Meeting Link"}
                      </a>
                    )}

                    <Link
                      href={`/teacher/liveclass/${item.id}`}
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      aria-label={`More options for ${item.title}`}
                      className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-100"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400">
          Live class information shown here is demo data.
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LiveClass["status"] }) {
  const styles = {
    Live: "bg-red-50 text-red-700",
    Upcoming: "bg-blue-50 text-blue-700",
    Completed: "bg-emerald-50 text-emerald-700",
  };

  const icons = {
    Live: <Radio size={13} />,
    Upcoming: <Clock size={13} />,
    Completed: <CheckCircle2 size={13} />,
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      {icons[status]}
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
