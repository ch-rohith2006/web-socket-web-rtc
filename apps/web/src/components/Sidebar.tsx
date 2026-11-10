
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Video,
  UserRoundPen,
  User,
  BookOpen,
  BookOpenCheck,
  Lightbulb,
  MessageSquare,
  Award,
  Bell,
  Zap,
  Menu,
  LogIn,
  UserPlus,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Live Class",
    href: "/liveclass",
    icon: Video,
  },
  {
    name: "My Learning",
    href: "/mylearning",
    icon: UserRoundPen,
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    name: "Assignments",
    href: "/assignments",
    icon: BookOpenCheck,
  },
  {
    name: "Quizzes",
    href: "/quizzes",
    icon: Lightbulb,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    name: "Certificates",
    href: "/certificates",
    icon: Award,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((previous) => !previous);
  };

  return (
    <aside
      className={`flex h-full min-h-0 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-[76px]" : "w-64"
      }`}
    >
      {/* Header and Toggle Button */}
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
                  Communication Hub
                </p>
              </div>
            </div>

            {/* Collapse Sidebar */}
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              aria-expanded="true"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Menu size={22} />
            </button>
          </>
        )}

        {/* Click Zap to Open Sidebar */}
        {isCollapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            aria-expanded="false"
            title="Open sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-700"
          >
            <Zap size={22} />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav
        aria-label="Main navigation"
        className="min-h-0 flex-1 space-y-2 overflow-y-auto overflow-x-hidden px-3 py-5"
      >
        {!isCollapsed && (
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
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

              {!isCollapsed && (
                <span>{item.name}</span>
              )}
            </Link>
          );
        })}

        {/* Login and Sign Up */}
        <div className="my-4 border-t border-slate-800 pt-4">

          {!isCollapsed && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account Access
            </p>
          )}

          {/* Login */}
          <Link
            href="/login"
            aria-current={pathname === "/login" ? "page" : undefined}
            title={isCollapsed ? "Login" : undefined}
            className={`mb-2 flex items-center rounded-lg py-3 text-sm font-medium transition-colors ${
              isCollapsed
                ? "justify-center px-2"
                : "gap-3 px-3"
            } ${
              pathname === "/login"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LogIn size={20} className="shrink-0" />

            {!isCollapsed && <span>Login</span>}
          </Link>

          {/* Sign Up */}
          <Link
            href="/signup"
            aria-current={pathname === "/signup" ? "page" : undefined}
            title={isCollapsed ? "Sign Up" : undefined}
            className={`flex items-center rounded-lg py-3 text-sm font-medium transition-colors ${
              isCollapsed
                ? "justify-center px-2"
                : "gap-3 px-3"
            } ${
              pathname === "/signup"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <UserPlus size={20} className="shrink-0" />

            {!isCollapsed && <span>Sign Up</span>}
          </Link>

        </div>
      </nav>

      {/* My Account - Fixed at Bottom */}
      <div className="shrink-0 border-t border-slate-800 p-3">
        <button
          type="button"
          onClick={() => router.push("/profile")}
          title={isCollapsed ? "My Account" : undefined}
          className={`flex w-full items-center rounded-lg p-2 text-left transition-colors hover:bg-slate-800 ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
            U
          </div>

          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                My Account
              </p>

              <p className="truncate text-xs text-slate-500">
                Workspace Member
              </p>
            </div>
          )}
        </button>
      </div>

    </aside>
  );
}
