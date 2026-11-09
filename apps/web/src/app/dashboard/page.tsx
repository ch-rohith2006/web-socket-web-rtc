
"use client";

import Link from "next/link";
import {
  Search,
  Bell,
  Mail,
  BookOpen,
  CheckCircle2,
  Clock3,
  Trophy,
  Video,
  CalendarDays,
  ClipboardList,
  ArrowRight,
  Play,
  FileText,
  CircleCheck,
  AlertCircle,
  Award,
  GraduationCap,
} from "lucide-react";

const statistics = [
  {
    title: "Enrolled Courses",
    value: "12",
    subtitle: "4 in progress",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Lessons Completed",
    value: "24",
    subtitle: "This month",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Hours Learned",
    value: "18",
    subtitle: "This month",
    icon: Clock3,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Certificates Earned",
    value: "5",
    subtitle: "Keep it up!",
    icon: Trophy,
    color: "bg-amber-100 text-amber-600",
  },
];

const courses = [
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Jane Cooper",
    progress: 75,
    status: "Continue",
    category: "Design",
    icon: GraduationCap,
    gradient: "from-indigo-800 to-blue-500",
  },
  {
    title: "Python Programming",
    instructor: "Robert Fox",
    progress: 60,
    status: "In Progress",
    category: "Programming",
    icon: FileText,
    gradient: "from-slate-900 to-cyan-600",
  },
  {
    title: "Digital Marketing Strategy",
    instructor: "Albert Flores",
    progress: 40,
    status: "Continue",
    category: "Marketing",
    icon: Trophy,
    gradient: "from-blue-500 to-indigo-400",
  },
  {
    title: "Photography Masterclass",
    instructor: "Brooklyn Simmons",
    progress: 0,
    status: "Not Started",
    category: "Photography",
    icon: Award,
    gradient: "from-slate-500 to-slate-800",
  },
];

const upcomingClasses = [
  {
    title: "UI/UX Design Principles",
    instructor: "Jane Cooper",
    date: "24 May",
    time: "10:00 AM",
  },
  {
    title: "Python Data Structures",
    instructor: "Robert Fox",
    date: "25 May",
    time: "02:00 PM",
  },
  {
    title: "Marketing Analytics",
    instructor: "Albert Flores",
    date: "26 May",
    time: "11:00 AM",
  },
];

const assignments = [
  {
    title: "Responsive Website Design",
    course: "UI/UX Design Fundamentals",
    deadline: "Today",
    status: "Urgent",
  },
  {
    title: "Python Programming Project",
    course: "Python Programming",
    deadline: "Tomorrow",
    status: "Pending",
  },
  {
    title: "Marketing Case Study",
    course: "Digital Marketing Strategy",
    deadline: "28 May",
    status: "Pending",
  },
];

const notifications = [
  {
    title: "New live class scheduled",
    description: "UI/UX Design Principles is scheduled for 24 May.",
    time: "10 minutes ago",
    icon: Video,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Assignment deadline reminder",
    description: "Your Responsive Website Design assignment is due today.",
    time: "1 hour ago",
    icon: ClipboardList,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Course progress updated",
    description: "You have completed 75% of UI/UX Design Fundamentals.",
    time: "Yesterday",
    icon: CheckCircle2,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "New certificate available",
    description: "Your latest course certificate is ready to view.",
    time: "2 days ago",
    icon: Award,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* Top Header */}
      <header className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Welcome back, Student! 
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Let's continue your learning journey today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm xl:w-72 xl:flex-none">
            <Search size={18} className="text-slate-400" />

            <input
              type="search"
              placeholder="Search courses, lessons..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Notifications */}
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Link>

          {/* Messages */}
          <Link
            href="/messages"
            aria-label="Messages"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <Mail size={20} />
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 pr-4 shadow-sm hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              S
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Student
              </p>
              <p className="text-xs text-slate-500">
                Learner
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Statistics Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {stat.title}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {stat.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Overall Learning Progress */}
      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">

        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            My Learning Progress
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep track of your overall learning journey.
          </p>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Overall Progress
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              You're doing great! Keep it up.
            </p>
          </div>

          <span className="text-lg font-bold text-slate-900">
            75%
          </span>
        </div>

        <div
          className="h-3 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Overall learning progress"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
        </div>

        <div className="mt-7 grid grid-cols-2 gap-5 md:grid-cols-4">

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-blue-500" />

            <div>
              <p className="text-xl font-bold text-slate-900">12</p>
              <p className="text-xs text-slate-500">In Progress</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />

            <div>
              <p className="text-xl font-bold text-slate-900">8</p>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-amber-500" />

            <div>
              <p className="text-xl font-bold text-slate-900">3</p>
              <p className="text-xs text-slate-500">Not Started</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-purple-500" />

            <div>
              <p className="text-xl font-bold text-slate-900">75%</p>
              <p className="text-xs text-slate-500">Overall Progress</p>
            </div>
          </div>

        </div>
      </section>

      {/* My Courses */}
      <section className="mb-9">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              My Courses
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Continue learning from your enrolled courses.
            </p>
          </div>

          <Link
            href="/courses"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View All Courses
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {courses.map((course) => {
            const Icon = course.icon;

            return (
              <div
                key={course.title}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Course Cover */}
                <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${course.gradient}`}>
                  <Icon size={58} className="text-white/90" />

                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800">
                    {course.status}
                  </span>
                </div>

                {/* Course Details */}
                <div className="p-4">

                  <p className="mb-2 text-xs font-medium text-blue-600">
                    {course.category}
                  </p>

                  <h3 className="min-h-[44px] text-sm font-bold leading-5 text-slate-900">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    Instructor: {course.instructor}
                  </p>

                  <div className="mb-2 mt-5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Course Progress
                    </span>

                    <span className="text-xs font-bold text-slate-800">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${course.gradient}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <Link
                    href="/my-learning"
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-blue-200 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    {course.progress === 0 ? "Start Course" : "Continue Learning"}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Upcoming Live Classes - AFTER MY COURSES */}
      <section className="mb-9 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Upcoming Live Classes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Join your upcoming online learning sessions.
            </p>
          </div>

          <Link
            href="/live-class"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View Calendar
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {upcomingClasses.map((session) => (
            <div
              key={session.title}
              className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <CalendarDays size={18} />
                <span className="mt-1 text-[10px] font-semibold">
                  {session.date}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-800">
                  {session.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {session.instructor}
                </p>

                <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={13} />
                  {session.time}
                </p>
              </div>

              <Link
                href="/live-class"
                className="shrink-0 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Join
              </Link>
            </div>
          ))}

        </div>
      </section>

      {/* Pending Assignments - AFTER UPCOMING CLASSES */}
      <section className="mb-9 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Pending Assignments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep an eye on your upcoming deadlines.
            </p>
          </div>

          <Link
            href="/assignments"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">

          {assignments.map((assignment) => (
            <div
              key={assignment.title}
              className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <FileText size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {assignment.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {assignment.course}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center gap-2">
                  {assignment.status === "Urgent" ? (
                    <AlertCircle size={16} className="text-red-500" />
                  ) : (
                    <Clock3 size={16} className="text-amber-500" />
                  )}

                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      Due: {assignment.deadline}
                    </p>

                    <p className={`mt-1 text-xs ${
                      assignment.status === "Urgent"
                        ? "text-red-500"
                        : "text-amber-600"
                    }`}>
                      {assignment.status}
                    </p>
                  </div>
                </div>

                <Link
                  href="/assignments"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  View
                </Link>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Recent Notifications - LAST SECTION */}
      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Stay updated with your latest learning activities.
            </p>
          </div>

          <Link
            href="/notifications"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-4">

          {notifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <div
                key={notification.title}
                className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-50"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${notification.color}`}>
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {notification.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {notification.description}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-slate-400">
                  {notification.time}
                </span>
              </div>
            );
          })}

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

    </div>
  );
}
