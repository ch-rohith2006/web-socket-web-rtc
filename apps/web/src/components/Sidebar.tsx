
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Home,
  LayoutDashboard,
  Video,
  Users,
  Settings,
  HelpCircle,
  Zap,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Meetings",
    href: "/meetings",
    icon: Video,
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: Users,
  },
    {
    name: "Courses",
    href: "/courses",
    icon: Users,
  },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300">

      {/* Logo and Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
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

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="space-y-2 border-t border-slate-800 px-4 py-5">

        <button
          type="button"
          onClick={() => router.push("/settings")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
            pathname.startsWith("/settings")
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Settings size={20} />
          Settings
        </button>

        <Link
          href="/help"
          className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
            pathname.startsWith("/help")
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <HelpCircle size={20} />
          Help & Support
        </Link>
      </div>

      {/* User Profile */}
      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-800"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
            U
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              My Account
            </p>
            <p className="text-xs text-slate-500">
              Workspace Member
            </p>
          </div>
        </button>
      </div>

    </aside>
  );
}
