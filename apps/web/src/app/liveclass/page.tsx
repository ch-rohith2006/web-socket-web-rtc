
"use client";

import { useMemo, useState } from "react";

import {
  Video,
  CalendarDays,
  Clock3,
  Search,
  Users,
  PlayCircle,
  Radio,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  X,
  MonitorPlay,
} from "lucide-react";

type ClassStatus = "Live" | "Upcoming" | "Completed";

type LiveClass = {
  id: number;
  title: string;
  instructor: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  students: number;
  status: ClassStatus;
};

const classes: LiveClass[] = [
  {
    id: 1,
    title: "Advanced React Development",
    instructor: "John Smith",
    category: "Web Development",
    date: "Today",
    time: "10:00 AM",
    duration: "60 minutes",
    students: 28,
    status: "Live",
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    instructor: "Jane Cooper",
    category: "Design",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "90 minutes",
    students: 32,
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Python Data Structures",
    instructor: "Robert Fox",
    category: "Programming",
    date: "Nov 12",
    time: "02:00 PM",
    duration: "60 minutes",
    students: 25,
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Marketing Analytics",
    instructor: "Albert Flores",
    category: "Marketing",
    date: "Nov 13",
    time: "11:00 AM",
    duration: "75 minutes",
    students: 20,
    status: "Upcoming",
  },
  {
    id: 5,
    title: "Introduction to Next.js",
    instructor: "Brooklyn Simmons",
    category: "Web Development",
    date: "Nov 7",
    time: "03:00 PM",
    duration: "60 minutes",
    students: 30,
    status: "Completed",
  },
  {
    id: 6,
    title: "JavaScript Fundamentals",
    instructor: "Cody Fisher",
    category: "Programming",
    date: "Nov 6",
    time: "11:00 AM",
    duration: "60 minutes",
    students: 24,
    status: "Completed",
  },
];

const filters = ["All", "Live", "Upcoming", "Completed"] as const;

export default function LiveClassPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [selectedClass, setSelectedClass] =
    useState<LiveClass | null>(null);

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.status === activeFilter;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.instructor.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const liveClasses = classes.filter((item) => item.status === "Live");
  const upcomingClasses = classes.filter(
    (item) => item.status === "Upcoming",
  );
  const completedClasses = classes.filter(
    (item) => item.status === "Completed",
  );

  function openClass(item: LiveClass) {
    setSelectedClass(item);
  }

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* Header */}
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Learning Sessions
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Live Classes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join interactive classes and learn directly from your instructors.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <CalendarDays size={19} className="text-blue-600" />
          <span className="text-sm font-medium text-slate-700">
            Your Learning Schedule
          </span>
        </div>
      </header>

      {/* Statistics */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Radio size={22} />
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {liveClasses.length}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Live Now
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CalendarDays size={22} />
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {upcomingClasses.length}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Upcoming Classes
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {completedClasses.length}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Completed Classes
          </p>
        </div>

      </section>

      {/* Live Now */}
      {liveClasses.length > 0 && (
        <section className="mb-9">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />

            <h2 className="text-lg font-bold text-slate-900">
              Live Now
            </h2>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
              LIVE
            </span>
          </div>

          {liveClasses.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg md:p-8"
            >
              <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    Class is live
                  </span>

                  <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm text-blue-100">
                    Instructor: {item.instructor}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-5 text-sm text-blue-100">
                    <span className="flex items-center gap-2">
                      <Clock3 size={17} />
                      {item.duration}
                    </span>

                    <span className="flex items-center gap-2">
                      <Users size={17} />
                      {item.students} students
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openClass(item)}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    <Video size={18} />
                    Join Live Class
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="hidden h-40 w-40 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 md:flex">
                  <Video size={76} className="text-white/90" />
                </div>
              </div>

              <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
              <div className="absolute -bottom-24 right-48 h-52 w-52 rounded-full bg-white/10" />
            </div>
          ))}
        </section>
      )}

      {/* Class Search and Filters */}
      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Explore Classes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find your classes and manage your schedule.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
              <Search size={17} className="text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search classes..."
                className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-52"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* All Classes */}
      <section className="mb-9">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {activeFilter === "All"
                ? "All Classes"
                : `${activeFilter} Classes`}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredClasses.length} classes available
            </p>
          </div>
        </div>

        {filteredClasses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <Video size={36} className="mx-auto mb-3 text-slate-400" />

            <h3 className="font-semibold text-slate-800">
              No classes found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or select a different filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {filteredClasses.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Video size={23} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      item.status === "Live"
                        ? "bg-red-100 text-red-600"
                        : item.status === "Upcoming"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {item.status === "Live"
                      ? "● Live Now"
                      : item.status}
                  </span>

                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-blue-600">
                    {item.category}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Instructor: {item.instructor}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays size={17} className="text-blue-500" />
                    {item.date}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock3 size={17} className="text-blue-500" />
                    {item.time}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock3 size={17} className="text-blue-500" />
                    {item.duration}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users size={17} className="text-blue-500" />
                    {item.students} students
                  </div>

                </div>

                <div className="mt-4 flex items-center justify-between gap-3">

                  <span className="text-xs font-medium text-slate-500">
                    {item.status === "Completed"
                      ? "Session completed"
                      : item.status === "Live"
                        ? "Join the session now"
                        : "Get ready for your class"}
                  </span>

                  <button
                    type="button"
                    onClick={() => openClass(item)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    {item.status === "Completed" ? (
                      <>
                        <PlayCircle size={15} />
                        View Recording
                      </>
                    ) : item.status === "Live" ? (
                      <>
                        <Video size={15} />
                        Join Now
                      </>
                    ) : (
                      <>
                        View Details
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </section>

      {/* Class Schedule */}
      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <CalendarDays size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Your Class Schedule
            </h2>

            <p className="text-sm text-slate-500">
              A quick overview of your upcoming sessions.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {upcomingClasses.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {item.instructor}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {item.date}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

      {/* Class Details Modal */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedClass(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <MonitorPlay size={22} />
              </div>

              <button
                type="button"
                onClick={() => setSelectedClass(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs font-semibold text-blue-600">
              {selectedClass.category}
            </p>

            <h2
              id="class-modal-title"
              className="mt-2 text-xl font-bold text-slate-900"
            >
              {selectedClass.title}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Instructor: {selectedClass.instructor}
            </p>

            <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4">
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <CalendarDays size={17} className="text-blue-600" />
                {selectedClass.date}
              </p>

              <p className="flex items-center gap-2 text-sm text-slate-700">
                <Clock3 size={17} className="text-blue-600" />
                {selectedClass.time} · {selectedClass.duration}
              </p>

              <p className="flex items-center gap-2 text-sm text-slate-700">
                <Users size={17} className="text-blue-600" />
                {selectedClass.students} students
              </p>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              {selectedClass.status === "Completed"
                ? "The recording player will be available here once recording storage is connected."
                : "This class preview is ready. The actual video room and Join functionality need to be connected to your WebRTC backend."}
            </p>

            <button
              type="button"
              onClick={() => setSelectedClass(null)}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
