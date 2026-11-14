
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  Video,
  Users,
  ClipboardList,
  FileQuestion,
  MessageSquare,
  Bell,
  User,
  Settings,
  Zap,
  Menu,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const navigation = [
  {
    name: "Dashboard",
    href: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    href: "/teacher/courses",
    icon: BookOpen,
  },
  {
    name: "Live Classes",
    href: "/teacher/liveclass",
    icon: Video,
  },
  {
    name: "My Students",
    href: "/teacher/mystudents",
    icon: Users,
  },
  {
    name: "Assignments",
    href: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    name: "Quizzes",
    href: "/teacher/quizzes",
    icon: FileQuestion,
  },
  {
    name: "Messages",
    href: "/teacher/messages",
    icon: MessageSquare,
  },
  {
    name: "Notifications",
    href: "/teacher/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    href: "/teacher/profile",
    icon: User,
  },
 
] as const;

export default function TeacherSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const userName = session?.user?.name || "Teacher";
  const userEmail = session?.user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();

  const toggleSidebar = () => {
    setIsCollapsed((previous) => !previous);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.replace("/auth");
      router.refresh();
    } catch (error) {
      console.error("Teacher logout failed:", error);
    }
  };

  return (
    <aside
      className={`flex h-full min-h-0 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-[76px]" : "w-64"
      }`}
    >
      {/* Header */}
      <div
        className={`flex h-20 shrink-0 items-center border-b border-slate-800 ${
          isCollapsed
            ? "justify-center px-2"
            : "justify-between px-5"
        }`}
      >
        {!isCollapsed && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Zap size={22} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-white">
                  WebRTC
                </h1>
                <p className="text-xs text-slate-500">
                  Teacher Portal
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Menu size={22} />
            </button>
          </>
        )}

        {isCollapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            title="Open sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            <Zap size={22} />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav
        aria-label="Teacher navigation"
        className="min-h-0 flex-1 space-y-2 overflow-y-auto overflow-x-hidden px-3 py-5"
      >
        {!isCollapsed && (
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Teacher Menu
          </p>
        )}

        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center rounded-lg py-3 text-sm font-medium transition-colors ${
                isCollapsed
                  ? "justify-center px-2"
                  : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} className="shrink-0" />

              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}

        {/* Account Access */}
        <div className="my-4 border-t border-slate-800 pt-4">
          {!isCollapsed && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account Access
            </p>
          )}

          {!isPending &&
            (session ? (
              <button
                type="button"
                onClick={handleLogout}
                title={isCollapsed ? "Logout" : undefined}
                className={`flex w-full items-center rounded-lg py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-600 hover:text-white ${
                  isCollapsed
                    ? "justify-center px-2"
                    : "gap-3 px-3"
                }`}
              >
                <LogOut size={20} className="shrink-0" />

                {!isCollapsed && <span>Logout</span>}
              </button>
            ) : (
              <>
                <Link
                  href="/auth"
                  title={isCollapsed ? "Login" : undefined}
                  className={`mb-2 flex items-center rounded-lg py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white ${
                    isCollapsed
                      ? "justify-center px-2"
                      : "gap-3 px-3"
                  }`}
                >
                  <LogIn size={20} className="shrink-0" />

                  {!isCollapsed && <span>Login</span>}
                </Link>

                <Link
                  href="/auth"
                  title={isCollapsed ? "Sign Up" : undefined}
                  className={`flex items-center rounded-lg py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white ${
                    isCollapsed
                      ? "justify-center px-2"
                      : "gap-3 px-3"
                  }`}
                >
                  <UserPlus size={20} className="shrink-0" />

                  {!isCollapsed && <span>Sign Up</span>}
                </Link>
              </>
            ))}
        </div>
      </nav>

      {/* Teacher Account - Fixed at Bottom */}
      <div className="shrink-0 border-t border-slate-800 p-3">
        <button
          type="button"
          onClick={() => router.push("/teacher/profile")}
          title={
            isCollapsed
              ? session
                ? userName
                : "My Account"
              : undefined
          }
          className={`flex w-full items-center rounded-lg p-2 text-left transition-colors hover:bg-slate-800 ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
            {isPending ? "..." : session ? userInitial : "T"}
          </div>

          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {isPending
                  ? "Loading..."
                  : session
                    ? userName
                    : "My Account"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {isPending
                  ? "Please wait"
                  : session
                    ? userEmail
                    : "Teacher"}
              </p>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
