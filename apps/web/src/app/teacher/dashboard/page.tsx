
import Link from "next/link";
import {
  BookOpen,
  Users,
  Video,
  ClipboardList,
  CalendarDays,
  ArrowUpRight,
  Plus,
  Clock,
  TrendingUp,
  MoreHorizontal,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "248",
    description: "Across all courses",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "My Courses",
    value: "12",
    description: "3 active courses",
    icon: BookOpen,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Live Classes",
    value: "08",
    description: "2 scheduled today",
    icon: Video,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Assignments",
    value: "36",
    description: "14 awaiting review",
    icon: ClipboardList,
    color: "bg-orange-50 text-orange-600",
  },
];

const courses = [
  {
    id: 1,
    name: "Full Stack Web Development",
    category: "Programming",
    students: 86,
    progress: 78,
  },
  {
    id: 2,
    name: "React & Next.js",
    category: "Frontend Development",
    students: 64,
    progress: 65,
  },
  {
    id: 3,
    name: "Database Management",
    category: "Backend Development",
    students: 52,
    progress: 45,
  },
];

const schedule = [
  {
    id: 1,
    time: "09:00 AM",
    title: "React Fundamentals",
    type: "Live Class",
    status: "Completed",
  },
  {
    id: 2,
    time: "11:30 AM",
    title: "Web Development",
    type: "Live Class",
    status: "Upcoming",
  },
  {
    id: 3,
    time: "02:00 PM",
    title: "Student Q&A Session",
    type: "Meeting",
    status: "Upcoming",
  },
];

const activities = [
  {
    id: 1,
    title: "New student enrolled",
    description: "A student joined Full Stack Web Development.",
    time: "10 minutes ago",
  },
  {
    id: 2,
    title: "Assignment submitted",
    description: "A student submitted a React assignment.",
    time: "35 minutes ago",
  },
  {
    id: 3,
    title: "Live class completed",
    description: "JavaScript Fundamentals session completed.",
    time: "2 hours ago",
  },
];

const quickActions = [
  {
    title: "Create Course",
    description: "Create and manage your courses",
    href: "/teacher/courses",
    icon: BookOpen,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Start Live Class",
    description: "Start a live teaching session",
    href: "/teacher/liveclass",
    icon: Video,
    color: "text-green-600 bg-green-50",
  },
  {
    title: "Manage Assignments",
    description: "Review student submissions",
    href: "/teacher/assignments",
    icon: ClipboardList,
    color: "text-purple-600 bg-purple-50",
  },
  {
    title: "View Students",
    description: "Manage your enrolled students",
    href: "/teacher/students",
    icon: Users,
    color: "text-orange-600 bg-orange-50",
  },
];

function SectionHeading({
  title,
  description,
  href,
  linkLabel = "View all",
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {linkLabel}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}

export default function TeacherDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 p-5 md:p-8">

        {/* Dashboard Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
              <GraduationCap size={18} />
              Teacher Portal
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your courses, students and teaching activities.
            </p>
          </div>

          <Link
            href="/teacher/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Course
          </Link>
        </header>

        {/* Statistics */}
        <section
          aria-label="Teaching statistics"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={23} />
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Courses and Schedule */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Courses */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <SectionHeading
              title="My Courses"
              description="Overview of your teaching courses"
              href="/teacher/courses"
            />

            <div className="space-y-7">
              {courses.map((course) => (
                <article key={course.id}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {course.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {course.category} · {course.students} students
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`More options for ${course.name}`}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label={`${course.name} completion`}
                    aria-valuenow={course.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <p className="mt-2 text-right text-xs font-medium text-slate-500">
                    {course.progress}% completed
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading
              title="Today's Schedule"
              description="Your teaching sessions"
            />

            <div className="space-y-6">
              {schedule.map((item) => (
                <article key={item.id} className="flex gap-3">
                  <div className="shrink-0 text-xs font-semibold text-blue-600">
                    {item.time}
                  </div>

                  <div className="min-w-0 border-l-2 border-blue-100 pl-4">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.type}
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        item.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href="/teacher/liveclass"
              className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              <CalendarDays size={17} />
              View Schedule
            </Link>
          </div>
        </section>

        {/* Activity and Quick Actions */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading
              title="Recent Activity"
              description="Latest updates from your classroom"
            />

            <div className="space-y-6">
              {activities.map((activity) => (
                <article key={activity.id} className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {activity.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {activity.description}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading
              title="Quick Actions"
              description="Frequently used teacher tools"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-slate-50"
                  >
                    <div className={`mb-3 inline-flex rounded-lg p-2.5 ${action.color}`}>
                      <Icon size={21} />
                    </div>

                    <h3 className="text-sm font-semibold text-slate-800">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {action.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Performance Summary */}
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-white p-3 text-blue-600">
              <TrendingUp size={24} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Teaching Overview
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Keep track of your courses, review assignments regularly,
                and schedule interactive live sessions to support your students.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
