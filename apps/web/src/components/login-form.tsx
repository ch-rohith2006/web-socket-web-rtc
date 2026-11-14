
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher">("student");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe,
      });

      if (result.error) {
        setError(result.error.message || "Invalid email or password.");
        return;
      }

      const session = await authClient.getSession();

      if (session.error || !session.data?.user) {
        setError("Unable to load your account. Please try again.");
        return;
      }

      const role = (
        session.data.user as typeof session.data.user & {
          role?: string;
        }
      ).role;

      if (role !== selectedRole) {
        await authClient.signOut();

        setError(
          `This account is not registered as a ${selectedRole}. Please select the correct account type.`
        );
        return;
      }

      if (role === "teacher") {
        router.replace("/teacher/dashboard");
      } else {
        router.replace("/dashboard");
      }

      router.refresh();
    } catch {
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
          A
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Login to continue your learning journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Login As
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              className={`rounded-xl border p-3 font-semibold transition ${
                selectedRole === "student"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-300 text-slate-600 hover:border-blue-300"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("teacher")}
              className={`rounded-xl border p-3 font-semibold transition ${
                selectedRole === "teacher"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-300 text-slate-600 hover:border-blue-300"
              }`}
            >
              Teacher
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-blue-600"
          />
          Remember me
        </label>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          href="/auth"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
