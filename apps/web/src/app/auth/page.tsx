
"use client";

import { useState } from "react";
import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome to Student Alumni
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Connect, learn and grow together.
          </p>
        </div>

        {/* Login and Signup Tabs */}
        <div className="mb-6 flex rounded-xl bg-slate-200 p-1">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
              isLogin
                ? "bg-white text-blue-600 shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-lg py-3 text-sm font-semibold transition ${
              !isLogin
                ? "bg-white text-blue-600 shadow"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Authentication Forms */}
        {isLogin ? <LoginForm /> : <SignupForm />}

      </div>
    </main>
  );
}
