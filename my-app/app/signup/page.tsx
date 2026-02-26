"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

const TOTAL_STEPS = 4;

const EMPLOYEE_OPTIONS = [
  { value: "0-10",   label: "1 – 10" },
  { value: "11-50",  label: "11 – 50" },
  { value: "51-100", label: "51 – 100" },
  { value: "100+",   label: "100+" },
];

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    companyWebsite: "",
    vertical: "",
    employees: "",
    password: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    if (currentStep === TOTAL_STEPS) {
      setIsSubmitting(true);
      setError("");
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Something went wrong");
          setIsSubmitting(false);
          return;
        }
        localStorage.setItem("token", data.token);
        window.location.href = "/onboarding";
      } catch {
        setError("Network error. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top progress bar */}
      <div className="h-[3px] bg-gray-100 w-full flex-shrink-0">
        <div
          className="h-full bg-[#6d5dfc] transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <Link href="/">
          <img src="/logo.png" alt="Karat" className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          Have an account?
          <Link href="/signin">
            <button className="ml-1 h-9 px-4 border border-gray-300 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              Sign in
            </button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 pt-14 pb-28">
        <div className="w-full max-w-[480px]">

          {/* ── Step 1: The basics ── */}
          {currentStep === 1 && (
            <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Let&apos;s start with the basics
              </h1>
              <div className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">
                      First name
                    </Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="h-11 border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">
                      Last name
                    </Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="h-11 border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Company name */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Company name
                  </Label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className="h-11 border-gray-300 rounded-lg"
                  />
                </div>

                {/* Work email */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Work email
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="h-11 border-gray-300 rounded-lg"
                  />
                  <p className="flex items-center gap-1.5 text-xs text-amber-600">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Please use a work email address if available
                  </p>
                </div>

                {/* Mobile number */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Mobile number
                  </Label>
                  <div className="flex gap-2">
                    <Select defaultValue="US">
                      <SelectTrigger className="w-24 h-11 border-gray-300 rounded-lg flex-shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">🇺🇸 US</SelectItem>
                        <SelectItem value="CA">🇨🇦 CA</SelectItem>
                        <SelectItem value="GB">🇬🇧 GB</SelectItem>
                        <SelectItem value="AU">🇦🇺 AU</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(555) 000-0000"
                      className="flex-1 h-11 border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Company website ── */}
          {currentStep === 2 && (
            <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                What&apos;s your company website?
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                If you have more than one website, enter the one you primarily do
                business on.
              </p>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Website
                </Label>
                <Input
                  type="url"
                  value={formData.companyWebsite}
                  onChange={(e) => updateField("companyWebsite", e.target.value)}
                  placeholder="https://www.yourcompany.com"
                  className="h-11 border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* ── Step 3: Team size + vertical ── */}
          {currentStep === 3 && (
            <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                How many employees do you have?
              </h1>
              <div className="space-y-2 mb-6">
                {EMPLOYEE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-lg border cursor-pointer transition-colors ${
                      formData.employees === opt.value
                        ? "border-[#6d5dfc] bg-[#6d5dfc]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="employees"
                      value={opt.value}
                      checked={formData.employees === opt.value}
                      onChange={(e) => updateField("employees", e.target.value)}
                      className="w-4 h-4 text-[#6d5dfc] accent-[#6d5dfc]"
                    />
                    <span className="text-sm text-gray-900">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-1.5 border-t border-gray-100 pt-6">
                <Label className="text-sm font-medium text-gray-700">
                  Business vertical
                </Label>
                <Select
                  value={formData.vertical}
                  onValueChange={(v) => updateField("vertical", v)}
                >
                  <SelectTrigger className="h-11 border-gray-300 rounded-lg">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arts">
                      Arts, Entertainment &amp; Recreation
                    </SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400">
                  If unsure, most creators select Arts, Entertainment &amp;
                  Recreation.
                </p>
              </div>
            </div>
          )}

          {/* ── Step 4: Password ── */}
          {currentStep === 4 && (
            <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Your account was created, set a password!
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                Choose a strong password to keep your account secure.
              </p>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Choose a password
                    <span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="h-11 border-gray-300 rounded-lg pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* OR Google */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <button className="w-full h-11 flex items-center justify-center gap-3 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  By clicking Submit, I acknowledge and agree to the terms of the{" "}
                  <a href="#" className="text-[#6d5dfc] hover:underline">
                    Karat Platform Agreement
                  </a>{" "}
                  on behalf of the Company identified above.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky footer — Back | Continue */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="max-w-[480px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-24">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="h-10 px-5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
          </div>

          <span className="text-xs text-gray-400">
            {currentStep} of {TOTAL_STEPS}
          </span>

          <div className="w-24 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={isSubmitting}
              className="h-10 px-6 bg-[#6d5dfc] hover:bg-[#5a4ddb] text-white rounded-md text-sm font-medium transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : currentStep === TOTAL_STEPS ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
