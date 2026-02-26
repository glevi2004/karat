"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("This field cannot be left blank");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("token", data.token);
      window.location.href = data.onboardingCompleted ? "/dashboard" : "/onboarding";
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="w-full lg:w-[480px] flex flex-col bg-white flex-shrink-0">
        {/* Logo */}
        <div className="px-10 pt-10 pb-6">
          <Link href="/">
            <img src="/logo.png" alt="Karat" className="h-7 w-auto" />
          </Link>
        </div>

        {/* Form card */}
        <div className="flex-1 px-10 pb-10">
          <div className="border border-gray-200 rounded-xl p-8 mt-4">
            <h1 className="text-xl font-semibold text-gray-900 mb-6">
              Sign in to your Karat account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`h-11 rounded-lg text-sm ${error ? "border-red-400 focus-visible:ring-red-400" : "border-gray-300"}`}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className={`h-11 rounded-lg text-sm ${error ? "border-red-400 focus-visible:ring-red-400" : "border-gray-300"}`}
                />
              </div>

              {error && (
                <p className="flex items-center gap-1.5 text-sm text-red-500">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#6d5dfc] hover:bg-[#5a4ddb] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google OAuth */}
            <button className="w-full h-11 flex items-center justify-center gap-3 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            {/* Bottom link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              New to Karat?{" "}
              <Link href="/signup" className="text-[#6d5dfc] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:flex flex-1 bg-[#f3f4f6] flex-col justify-center px-16">
        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
          Creator Banking
        </p>
        <h2 className="text-4xl font-black text-gray-900 leading-tight mb-6">
          Banking built for<br />the creator economy.
        </h2>
        <ul className="space-y-3">
          {[
            "Free domestic wire transfers",
            "Up to 1.75% APY on checking",
            "Business Visa® cards",
            "Creator-specific tax planning",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
              <div className="w-5 h-5 rounded-full bg-[#6d5dfc]/15 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-[#6d5dfc]" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-gray-400 max-w-sm leading-relaxed">
          Karat is a financial technology company, not a bank. Banking services provided by Grasshopper Bank, N.A., Member FDIC.
        </p>
      </div>
    </div>
  );
}
