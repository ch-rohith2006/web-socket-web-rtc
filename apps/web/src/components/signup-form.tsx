
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/utils/auth-client";

type AccountType = "student" | "teacher";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [accountType, setAccountType] =
    useState<AccountType>("student");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Validate full name
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Send the selected account type to Better Auth.
      // The backend must be configured to accept this additional field.
      const signupData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        accountType,
        callbackURL:
          accountType === "teacher"
            ? "/teacher-pending"
            : "/dashboard",
      };

      const { error: signupError } =
        await authClient.signUp.email(signupData);

      if (signupError) {
        setError(
          signupError.message || "Unable to create your account."
        );
        return;
      }

      // Teacher registration
      if (accountType === "teacher") {
        router.replace("/teacher-pending");
        router.refresh();
        return;
      }

      // Student registration
      router.replace("/dashboard");
      router.refresh();

    } catch (err) {
      console.error("Signup error:", err);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
          A
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign up to start your learning journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Account Type */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Account Type
          </label>

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              disabled={loading}
              onClick={() => setAccountType("student")}
              className={`rounded-xl border py-3 font-semibold transition ${
                accountType === "student"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => setAccountType("teacher")}
              className={`rounded-xl border py-3 font-semibold transition ${
                accountType === "teacher"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Teacher
            </button>

          </div>

          {accountType === "teacher" && (
            <p className="mt-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
              Teacher registration requires administrator approval.
              Your account will remain pending until approved.
            </p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Full Name
          </label>

          <input
            id="signup-name"
            name="fullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address
          </label>

          <input
            id="signup-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="signup-password"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="signup-confirm-password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Confirm Password
          </label>

          <div className="relative">
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Creating account..."
            : accountType === "teacher"
              ? "Register as Teacher"
              : "Create Account"}
        </button>

      </form>

      {/* Login */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}

        <Link
          href="/auth"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Login
        </Link>
      </p>

    </div>
  );
}
