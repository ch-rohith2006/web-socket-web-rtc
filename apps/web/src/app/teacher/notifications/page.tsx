
"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  ClipboardList,
  MessageSquare,
  Video,
  Users,
  BookOpen,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

type NotificationType =
  | "assignment"
  | "message"
  | "liveclass"
  | "student"
  | "course"
  | "system";

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  date: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "assignment",
    title: "New assignment submission",
    description:
      "Rahul Sharma submitted the assignment 'React Fundamentals'.",
    time: "10 minutes ago",
    date: "Today",
    read: false,
  },
  {
    id: 2,
    type: "message",
    title: "New message received",
    description:
      "Priya Verma sent you a message about the JavaScript course.",
    time: "30 minutes ago",
    date: "Today",
    read: false,
  },
  {
    id: 3,
    type: "liveclass",
    title: "Upcoming live class",
    description:
      "Your Advanced React live class starts in 30 minutes.",
    time: "1 hour ago",
    date: "Today",
    read: false,
  },
  {
    id: 4,
    type: "student",
    title: "New student enrolled",
    description:
      "A new student, Arjun Kumar, enrolled in your Web Development course.",
    time: "3 hours ago",
    date: "Today",
    read: true,
  },
  {
    id: 5,
    type: "course",
    title: "Course update",
    description:
      "Your UI/UX Design course information was successfully updated.",
    time: "Yesterday",
    date: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "assignment",
    title: "Assignment deadline approaching",
    description:
      "The deadline for the TypeScript assignment is tomorrow.",
    time: "Yesterday",
    date: "Yesterday",
    read: true,
  },
  {
    id: 7,
    type: "system",
    title: "Welcome to your teacher dashboard",
    description:
      "Your teacher account is ready. Start managing your courses and students.",
    time: "2 days ago",
    date: "Earlier",
    read: true,
  },
];

const categories = [
  "All",
  "Unread",
  "Assignments",
  "Messages",
  "Live Classes",
  "Students",
];

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "assignment":
      return ClipboardList;
    case "message":
      return MessageSquare;
    case "liveclass":
      return Video;
    case "student":
      return Users;
    case "course":
      return BookOpen;
    default:
      return Bell;
  }
}

function getNotificationColor(type: NotificationType) {
  switch (type) {
    case "assignment":
      return "bg-blue-50 text-blue-600";
    case "message":
      return "bg-violet-50 text-violet-600";
    case "liveclass":
      return "bg-orange-50 text-orange-600";
    case "student":
      return "bg-green-50 text-green-600";
    case "course":
      return "bg-cyan-50 text-cyan-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      let matchesCategory = true;

      if (activeCategory === "Unread") {
        matchesCategory = !item.read;
      } else if (activeCategory === "Assignments") {
        matchesCategory = item.type === "assignment";
      } else if (activeCategory === "Messages") {
        matchesCategory = item.type === "message";
      } else if (activeCategory === "Live Classes") {
        matchesCategory = item.type === "liveclass";
      } else if (activeCategory === "Students") {
        matchesCategory = item.type === "student";
      }

      return matchesSearch && matchesCategory;
    });
  }, [notifications, activeCategory, search]);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Bell size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Stay updated with your teaching activities.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Notifications
              </p>
              <Bell className="text-indigo-500" size={20} />
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {notifications.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Unread Notifications
              </p>
              <AlertCircle className="text-orange-500" size={20} />
            </div>
            <p className="mt-3 text-3xl font-bold text-orange-600">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Read Notifications
              </p>
              <CheckCircle2 className="text-green-500" size={20} />
            </div>
            <p className="mt-3 text-3xl font-bold text-green-600">
              {notifications.length - unreadCount}
            </p>
          </div>
        </div>

        {/* Notification List */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Activity
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage your notifications.
                </p>
              </div>

              <div className="relative w-full lg:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search notifications..."
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={17} className="shrink-0 text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                  {category === "Unread" && unreadCount > 0 && (
                    <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => {
                const Icon = getNotificationIcon(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`flex gap-3 border-b border-gray-100 p-5 transition hover:bg-gray-50 sm:gap-4 ${
                      !notification.read ? "bg-indigo-50/40" : "bg-white"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getNotificationColor(
                        notification.type
                      )}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-indigo-600" />
                            )}
                          </div>

                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {notification.description}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                            <Clock size={13} />
                            <span>{notification.time}</span>
                            <span>•</span>
                            <CalendarDays size={13} />
                            <span>{notification.date}</span>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                              className="rounded-lg p-2 text-gray-400 transition hover:bg-green-50 hover:text-green-600"
                            >
                              <Check size={18} />
                            </button>
                          )}

                          <button
                            onClick={() =>
                              deleteNotification(notification.id)
                            }
                            title="Delete notification"
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="rounded-full bg-gray-100 p-5">
                  <Bell size={30} className="text-gray-400" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  No notifications found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or notification filter.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-500">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </p>
            <span className="text-xs font-medium text-gray-400">
              Latest activity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
