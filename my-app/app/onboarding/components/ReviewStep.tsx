"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const benefits = [
  {
    title: "Taxes on autopilot",
    desc: "Automatically set aside money for taxes and earn up to 2.75% APY",
    icon: "💰",
  },
  {
    title: "Free wire transfers",
    desc: "Removing pesky bank fees and saving your business money",
    icon: "💸",
  },
  {
    title: "Big discount energy",
    desc: "Save big on creator software like Epidemic Sound, Viewstats, and more",
    icon: "🎁",
  },
  {
    title: "VIP treatment",
    desc: "Network with your favorite creators at exclusive Karat events",
    icon: "⭐",
  },
  {
    title: "Boosted rate",
    desc: "Earn up to 1.75% APY - even on your checking account",
    icon: "📈",
  },
];

interface ReviewStepProps {
  agreedToTerms: boolean;
  onChangeAgreedToTerms: (checked: boolean) => void;
}

export function ReviewStep({ agreedToTerms, onChangeAgreedToTerms }: ReviewStepProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left — Benefits */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          What you&apos;re unlocking
        </h2>
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 bg-[#1c1c21] rounded-xl border border-white/5"
          >
            <div className="w-10 h-10 bg-indigo-950/60 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
              {benefit.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">{benefit.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right — Review form */}
      <div className="bg-[#1c1c21] rounded-2xl border border-white/5 p-8 h-fit">
        <h1 className="text-2xl font-bold text-white mb-2">
          Confirm and review
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Review the information and make sure everything looks good.
        </p>

        <div className="flex items-center justify-between p-4 bg-[#27272a] rounded-lg mb-6">
          <span className="font-medium text-gray-300 text-sm">
            Completed details
          </span>
          <span className="text-xs text-green-400 bg-green-950/40 border border-green-800/40 px-3 py-1 rounded-full font-medium">
            Ready for review
          </span>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => onChangeAgreedToTerms(checked as boolean)}
            className="mt-0.5 border-[#3f3f46] checkbox-karat"
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-400 leading-relaxed cursor-pointer"
          >
            By proceeding, I certify, on behalf of myself and the business and
            all owners listed in this application, that I consent, and have
            obtained the express consent of the business and owners, to the{" "}
            <Link href="#" className="text-indigo-400 hover:underline">
              Grasshopper Bank Master Service Agreement
            </Link>
            , as supplemented by the{" "}
            <Link href="#" className="text-indigo-400 hover:underline">
              Deposit Account Agreement Disclosures
            </Link>
            ,{" "}
            <Link href="#" className="text-indigo-400 hover:underline">
              Debit Cardholder Agreement
            </Link>
            ,{" "}
            <Link href="#" className="text-indigo-400 hover:underline">
              Grasshopper Privacy Policy
            </Link>
            , and{" "}
            <Link href="#" className="text-indigo-400 hover:underline">
              Grasshopper Prohibited and Restricted Guidelines
            </Link>
            .
          </label>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          By clicking &quot;Confirm and apply,&quot; you certify, to the best of your
          knowledge, all information provided as part of this application is
          complete and correct. Karat Banking services are provided by
          Grasshopper Bank, N.A., Member FDIC.
        </p>
      </div>
    </div>
  );
}
