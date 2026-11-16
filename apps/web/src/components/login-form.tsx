
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher">(
    "student"
  );
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

      const user = session.data.user as typeof session.data.user & {
        role?: string;
      };

      const role = user.role?.toLowerCase();

      // Check the actual role saved in the user's account.
      if (role !== selectedRole) {
        await authClient.signOut();

        setError(
          `This account is not registered as a ${selectedRole}. Please select the correct account type.`
        );
        return;
      }

      // Direct teacher and student navigation. No admin approval.
      if (role === "teacher") {
        router.replace("/teacher/dashboard" as any);
      } else if (role === "student") {
        router.replace("/dashboard");
      } else {
        await authClient.signOut();
        setError("Account type not recognized.");
        return;
      }

      router.refresh();
    } catch {
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="min-w-0 flex-1 px-4 py-3 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="px-4 text-sm text-gray-600 hover:text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Login As
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole("student")}
              className={`rounded-lg border px-4 py-3 font-medium transition ${
                selectedRole === "student"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("teacher")}
              className={`rounded-lg border px-4 py-3 font-medium transition ${
                selectedRole === "teacher"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              Teacher
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
