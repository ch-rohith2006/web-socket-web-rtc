
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  Users,
  Clock,
  MoreHorizontal,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  students: number;
  lessons: number;
  duration: string;
  status: "Published" | "Draft";
  color: string;
  progress: number;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Learn HTML, CSS, JavaScript, React and backend development.",
    category: "Development",
    students: 86,
    lessons: 32,
    duration: "12 weeks",
    status: "Published",
    color: "bg-blue-100 text-blue-700",
    progress: 78,
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    description: "Master design principles, wireframes and prototyping.",
    category: "Design",
    students: 64,
    lessons: 24,
    duration: "8 weeks",
    status: "Published",
    color: "bg-purple-100 text-purple-700",
    progress: 65,
  },
  {
    id: 3,
    title: "Advanced React Development",
    description: "Build modern applications using advanced React concepts.",
    category: "Development",
    students: 52,
    lessons: 28,
    duration: "10 weeks",
    status: "Published",
    color: "bg-emerald-100 text-emerald-700",
    progress: 45,
  },
  {
    id: 4,
    title: "Database Management",
    description: "Understand SQL, database design and data management.",
    category: "Database",
    students: 0,
    lessons: 18,
    duration: "6 weeks",
    status: "Draft",
    color: "bg-orange-100 text-orange-700",
    progress: 0,
  },
];

const filters = ["All", "Published", "Draft"];

export default function TeacherCoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || course.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalStudents = courses.reduce(
    (total, course) => total + course.students,
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
              My Courses
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Create, organize and manage your learning courses.
            </p>
          </div>

          <Link
            href="/teacher/courses/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Course
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Courses"
            value={courses.length}
            icon={<BookOpen size={21} />}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={<Users size={21} />}
            color="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Published Courses"
            value={courses.filter((c) => c.status === "Published").length}
            icon={<GraduationCap size={21} />}
            color="bg-emerald-50 text-emerald-600"
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
                placeholder="Search courses..."
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

        {/* Course Grid */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Your Courses
            </h2>
            <p className="text-sm text-slate-500">
              {filteredCourses.length} courses found
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <BookOpen className="mx-auto text-slate-400" size={36} />
              <h3 className="mt-4 font-semibold text-slate-800">
                No courses found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try another search or filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
                    <BookOpen size={48} className="text-blue-400" />
                  </div>

                  <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`rounded-lg px-3 py-1 text-xs font-semibold ${course.color}`}>
                        {course.category}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.status === "Published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {course.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 border-y border-slate-100 py-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Users size={15} />
                        {course.students} Students
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={15} />
                        {course.lessons} Lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={15} />
                        {course.duration}
                      </span>
                    </div>

                    <div>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="font-medium text-slate-600">
                          Course completion
                        </span>
                        <span className="font-semibold text-slate-900">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        href={`/teacher/courses/${course.id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Manage Course
                        <ArrowUpRight size={16} />
                      </Link>

                      <button
                        type="button"
                        aria-label={`More options for ${course.title}`}
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
                      >
                        <MoreHorizontal size={19} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
