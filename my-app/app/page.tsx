"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// Avatar images for the trust section
const trustedAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
];

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f3f4f6]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Karat" className="h-6 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#banking" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
                Banking
              </Link>
              <Link href="#card" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
                Card
              </Link>
              <Link href="#about" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
                About
              </Link>
              <Link href="#community" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
                Community
              </Link>
              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors font-medium">
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/signin">
                <Button variant="outline" className="h-10 px-6 bg-transparent border-gray-400 text-gray-900 hover:bg-gray-100 rounded-md font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="h-10 px-6 bg-[#6d5dfc] hover:bg-[#5a4ddb] text-white rounded-md font-medium">
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-linear-to-b from-[#f3f4f6] via-[#e8e9ec] to-[#f3f4f6]" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[0.95] mb-6 karat-hero-text">
            BANKING FOR<br />
            FREELANCERS
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Business banking that gives you peace of mind.
          </p>

          {/* Email Signup Form */}
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-l-md rounded-r-none sm:rounded-r-none focus-visible:ring-[#6d5dfc] focus-visible:ring-1 focus-visible:border-[#6d5dfc]"
            />
            <Link href="/signup">
              <Button className="h-12 px-8 bg-[#6d5dfc] hover:bg-[#5a4ddb] text-white rounded-r-md rounded-l-md sm:rounded-l-none font-semibold uppercase tracking-wide whitespace-nowrap">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Avatar Stack & Trust Text */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {trustedAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                >
                  <img
                    src={avatar}
                    alt="Creator"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Trusted by Wendover Productions, Alex Botez, 3LAU and thousands of other creators
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Browser mockup */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Browser header */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md px-4 py-1.5 text-sm text-gray-500 text-center border border-gray-200">
                  trykarat.com
                </div>
              </div>
              <div className="w-20"></div>
            </div>
            {/* Dashboard content */}
            <div className="bg-white p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <img src="/logo.png" alt="Karat" className="h-5 w-auto" />
                </div>
                <Button className="bg-[#6d5dfc] hover:bg-[#5a4ddb] text-white text-sm">
                  Move money
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div>
              {/* Welcome message */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Hi Esther, welcome.</h2>
              {/* Dashboard grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Checking</p>
                  <p className="text-2xl font-bold text-gray-900">$9,655</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Account info</p>
                  <p className="text-sm text-gray-700">**** 4242</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* FDIC disclaimer */}
          <p className="text-xs text-gray-500 text-center mt-4 px-4">
            *Karat is a financial technology company, not a bank. Banking services provided by Grasshopper Bank, N.A., Member FDIC, with cards pursuant to a license from Visa USA Inc. The FDIC's deposit insurance only protects against the failure of an FDIC-insured bank.
          </p>
        </div>
      </section>

      {/* Banking Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Banking services that have your back
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Banking account", desc: "FDIC insured checking and savings" },
              { title: "Easy payments", desc: "Make payment with ACH, wire, Karat payment" },
              { title: "Free domestic wires", desc: "Transfer money without stress" },
              { title: "High yield checking", desc: "Get up to premium APY on business checking" },
              { title: "Business Visa® cards", desc: "Physical and virtual cards" },
              { title: "Creator-specific tax planning", desc: "Set aside money automatically for taxes" },
              { title: "Automated bookkeeping", desc: "Get tax-ready reports in seconds" },
              { title: "Fast invoicing", desc: "Create branded invoice with ease" },
            ].map((service, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-100 hover:border-[#6d5dfc]/30 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#f3f4f6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              top creators love us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our featured creators are Karat members, investors, and supporters of the creator community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Graham Stephan",
                handle: "@GrahamStephan",
                followers: "4.5M SUBSCRIBERS on youtube",
                quote: "Karat provided higher spending limits when vendors delayed paying us, supporting our coffee line.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Alexandra Botez",
                handle: "@AlexandraBotez",
                followers: "1.3M FOLLOWERS ON TWITCH",
                quote: "Karat is the best business credit card for creators–they approved when other banks rejected me twice.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Nas Daily",
                handle: "@NasDaily",
                followers: "21M FOLLOWERS ON FACEBOOK",
                quote: "I have over $10M in revenue per year and 100 employees, but traditional banks still don't trust me. Karat gets it.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.name}</h3>
                    <p className="text-xs text-[#6d5dfc] uppercase tracking-wide">{t.followers}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <p className="text-sm text-gray-500">{t.handle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">Karat Users Made Over:</p>
          <p className="text-5xl sm:text-6xl font-black text-gray-900 mb-2">$2.4 billion</p>
          <p className="text-gray-500">in 2024</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f3f4f6]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply now</h2>
          <p className="text-gray-600 mb-8">Business banking that gives you peace of mind.</p>
          <Link href="/signup">
            <Button className="h-12 px-10 bg-[#6d5dfc] hover:bg-[#5a4ddb] text-white rounded-md font-semibold">
              Sign up here
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="Karat" className="h-5 w-auto" />
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 Karat Financial. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
