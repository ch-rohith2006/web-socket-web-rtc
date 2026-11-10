
"use client";

import { useMemo, useState } from "react";

import {
  Bell,
  Search,
  Video,
  ClipboardList,
  MessageSquare,
  BookOpen,
  Award,
  CheckCircle2,
  Clock3,
  CheckCheck,
  Trash2,
  Filter,
  CalendarDays,
  Settings,
  X,
  BellOff,
  ArrowRight,
} from "lucide-react";

/* -------------------- Notification Types -------------------- */

type NotificationCategory =
  | "Classes"
  | "Assignments"
  | "Messages"
  | "Courses"
  | "Certificates"
  | "System";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  category: NotificationCategory;
  read: boolean;
  group: "Today" | "Earlier";
};

/* -------------------- Sample Notifications -------------------- */

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Upcoming Live Class",
    description:
      "Your Advanced React Development class with John Smith starts soon.",
    time: "10 minutes ago",
    category: "Classes",
    read: false,
    group: "Today",
  },
  {
    id: 2,
    title: "Assignment Deadline Reminder",
    description:
      "Your Responsive Website Design assignment is due soon. Remember to submit your work.",
    time: "30 minutes ago",
    category: "Assignments",
    read: false,
    group: "Today",
  },
  {
    id: 3,
    title: "New Message from Lecturer",
    description:
      "John Smith sent you a message about your React assignment.",
    time: "1 hour ago",
    category: "Messages",
    read: false,
    group: "Today",
  },
  {
    id: 4,
    title: "New Course Available",
    description:
      "A new Advanced Next.js course has been added to your learning platform.",
    time: "3 hours ago",
    category: "Courses",
    read: false,
    group: "Today",
  },
  {
    id: 5,
    title: "Assignment Evaluated",
    description:
      "Your HTML and CSS Fundamentals assignment received 92 out of 100 marks.",
    time: "Yesterday",
    category: "Assignments",
    read: true,
    group: "Earlier",
  },
  {
    id: 6,
    title: "Certificate Earned",
    description:
      "Congratulations! Your JavaScript Fundamentals certificate is now available.",
    time: "Yesterday",
    category: "Certificates",
    read: true,
    group: "Earlier",
  },
  {
    id: 7,
    title: "Course Progress Updated",
    description:
      "You have completed 75% of your UI/UX Design Fundamentals course.",
    time: "2 days ago",
    category: "Courses",
    read: true,
    group: "Earlier",
  },
  {
    id: 8,
    title: "Welcome to WebRTC Learning",
    description:
      "Your learning account is ready. Explore courses and start learning.",
    time: "3 days ago",
    category: "System",
    read: true,
    group: "Earlier",
  },
];

const filters = [
  "All",
  "Unread",
  "Classes",
  "Assignments",
  "Messages",
  "Courses",
  "Certificates",
  "System",
] as const;

/* -------------------- Icon Helpers -------------------- */

function getNotificationIcon(category: NotificationCategory) {
  switch (category) {
    case "Classes":
      return Video;
    case "Assignments":
      return ClipboardList;
    case "Messages":
      return MessageSquare;
    case "Courses":
      return BookOpen;
    case "Certificates":
      return Award;
    case "System":
      return Settings;
  }
}

function getNotificationColor(category: NotificationCategory) {
  switch (category) {
    case "Classes":
      return "bg-blue-100 text-blue-600";
    case "Assignments":
      return "bg-orange-100 text-orange-600";
    case "Messages":
      return "bg-purple-100 text-purple-600";
    case "Courses":
      return "bg-emerald-100 text-emerald-600";
    case "Certificates":
      return "bg-amber-100 text-amber-600";
    case "System":
      return "bg-slate-100 text-slate-600";
  }
}

/* -------------------- Notifications Page -------------------- */

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  /* Unread Count */

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  /* Mark One Notification as Read */

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  /* Mark All as Read */

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  /* Remove One Notification */

  const removeNotification = (id: number) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );
  };

  /* Clear All Notifications */

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  /* Search and Filter */

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Unread"
            ? !notification.read
            : notification.category === activeFilter;

      const matchesSearch =
        notification.title.toLowerCase().includes(search.toLowerCase()) ||
        notification.description.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [notifications, activeFilter, search]);

  const todayNotifications = filteredNotifications.filter(
    (notification) => notification.group === "Today"
  );

  const earlierNotifications = filteredNotifications.filter(
    (notification) => notification.group === "Earlier"
  );

  return (
    <div className="min-h-full bg-[#F5F7FF] p-5 md:p-8">

      {/* ================= PAGE HEADER ================= */}

      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Stay Updated
          </p>

          <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Notifications

            {unreadCount > 0 && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                {unreadCount} New
              </span>
            )}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Stay informed about your classes, assignments and learning activities.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
          >
            <CheckCheck size={18} />
            Mark All as Read
          </button>
        )}

      </header>

      {/* ================= NOTIFICATION OVERVIEW ================= */}

      <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div className="flex items-center gap-4">

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Bell size={27} />

              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-3 w-3 rounded-full border-2 border-blue-100 bg-red-500" />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Your Notification Center
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notifications waiting for you.`
                  : "You are all caught up with your notifications."}
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            <div className="rounded-xl bg-blue-50 px-4 py-3">
              <p className="text-xl font-bold text-blue-700">
                {notifications.length}
              </p>
              <p className="text-xs text-slate-500">
                Total
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 px-4 py-3">
              <p className="text-xl font-bold text-orange-600">
                {unreadCount}
              </p>
              <p className="text-xs text-slate-500">
                Unread
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 px-4 py-3">
              <p className="text-xl font-bold text-emerald-600">
                {notifications.length - unreadCount}
              </p>
              <p className="text-xs text-slate-500">
                Read
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= MAIN NOTIFICATIONS ================= */}

      <section className="mb-8">

        {/* Section Header */}

        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              All Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage your latest updates.
            </p>
          </div>

          <div className="flex items-center gap-2">

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAllNotifications}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={15} />
                Clear All
              </button>
            )}

          </div>

        </div>

        {/* Search */}

        <div className="mb-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

          <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3">
            <Search size={18} className="text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notifications..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Filters */}

          <div className="flex flex-wrap items-center gap-2">

            <Filter size={17} className="mr-1 text-slate-400" />

            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {filter}
              </button>
            ))}

          </div>

        </div>

        {/* Notification List */}

        {filteredNotifications.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <BellOff size={30} />
            </div>

            <h3 className="font-semibold text-slate-800">
              No Notifications Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              You don't have any notifications matching this filter.
            </p>

          </div>

        ) : (

          <div className="space-y-7">

            {/* Today */}

            {todayNotifications.length > 0 && (
              <div>

                <div className="mb-4 flex items-center gap-2">
                  <Clock3 size={17} className="text-blue-600" />

                  <h3 className="text-sm font-bold text-slate-800">
                    Today
                  </h3>

                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                    {todayNotifications.length}
                  </span>
                </div>

                <div className="space-y-3">

                  {todayNotifications.map((notification) => {

                    const Icon = getNotificationIcon(notification.category);

                    return (
                      <article
                        key={notification.id}
                        className={`group rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
                          notification.read
                            ? "border-slate-100 bg-white"
                            : "border-blue-200 bg-blue-50/40"
                        }`}
                      >

                        <div className="flex items-start gap-4">

                          {/* Icon */}

                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getNotificationColor(notification.category)}`}>
                            <Icon size={23} />
                          </div>

                          {/* Details */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h4 className="text-sm font-bold text-slate-900">
                                {notification.title}
                              </h4>

                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                              )}

                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              {notification.description}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-3">

                              <span className="text-xs text-slate-400">
                                {notification.time}
                              </span>

                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                                {notification.category}
                              </span>

                              {!notification.read && (
                                <span className="text-[10px] font-semibold text-blue-600">
                                  New
                                </span>
                              )}

                            </div>

                          </div>

                          {/* Actions */}

                          <div className="flex shrink-0 flex-col gap-1 sm:flex-row">

                            {!notification.read && (
                              <button
                                type="button"
                                title="Mark as read"
                                aria-label={`Mark ${notification.title} as read`}
                                onClick={() => markAsRead(notification.id)}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                              >
                                <CheckCheck size={17} />
                              </button>
                            )}

                            <button
                              type="button"
                              title="Delete notification"
                              aria-label={`Delete ${notification.title}`}
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                            >
                              <X size={17} />
                            </button>

                          </div>

                        </div>

                      </article>
                    );
                  })}

                </div>

              </div>
            )}

            {/* Earlier */}

            {earlierNotifications.length > 0 && (
              <div>

                <div className="mb-4 flex items-center gap-2">
                  <CalendarDays size={17} className="text-slate-500" />

                  <h3 className="text-sm font-bold text-slate-800">
                    Earlier
                  </h3>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                    {earlierNotifications.length}
                  </span>
                </div>

                <div className="space-y-3">

                  {earlierNotifications.map((notification) => {

                    const Icon = getNotificationIcon(notification.category);

                    return (
                      <article
                        key={notification.id}
                        className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                      >

                        <div className="flex items-start gap-4">

                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getNotificationColor(notification.category)}`}>
                            <Icon size={23} />
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h4 className="text-sm font-bold text-slate-900">
                                {notification.title}
                              </h4>

                              {notification.read && (
                                <CheckCircle2
                                  size={15}
                                  className="text-emerald-500"
                                />
                              )}

                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              {notification.description}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-3">

                              <span className="text-xs text-slate-400">
                                {notification.time}
                              </span>

                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                                {notification.category}
                              </span>

                            </div>

                          </div>

                          <div className="flex shrink-0 flex-col gap-1 sm:flex-row">

                            {!notification.read && (
                              <button
                                type="button"
                                title="Mark as read"
                                onClick={() => markAsRead(notification.id)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                              >
                                <CheckCheck size={17} />
                              </button>
                            )}

                            <button
                              type="button"
                              title="Delete notification"
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                              className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                            >
                              <X size={17} />
                            </button>

                          </div>

                        </div>

                      </article>
                    );
                  })}

                </div>

              </div>
            )}

          </div>

        )}

      </section>

      {/* ================= NOTIFICATION SETTINGS BANNER ================= */}

      <section className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center md:p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Settings size={25} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Stay Updated With Your Learning
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Check your classes, assignments and messages regularly.
            </p>
          </div>

        </div>

        <a
          href="/my-learning"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          My Learning
          <ArrowRight size={17} />
        </a>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        WebRTC Learning Platform © 2026. All rights reserved.
      </footer>

    </div>
  );
}
