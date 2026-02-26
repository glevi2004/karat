"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Shield } from "lucide-react";
import Link from "next/link";
import { useAddressAutocomplete } from "../hooks/useAddressAutocomplete";
import { US_STATES } from "../lib/usStates";

interface PersonalInfoStepProps {
  data: {
    isOwner: string;
    firstName: string;
    lastName: string;
    dob: string;
    hasSSN: string;
    streetAddress: string;
    aptSuite: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onChange: (data: any) => void;
}

const inputCls = "mt-2 h-12 bg-[#27272a] border-[#3f3f46] text-white placeholder:text-gray-600 focus-visible:ring-[#6d5dfc] focus-visible:border-[#6d5dfc]";
const selectTriggerCls = "mt-2 h-12 bg-[#27272a] border-[#3f3f46] text-white";

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  const updateField = (field: string, value: string) =>
    onChange({ ...data, [field]: value });

  const streetAddressRef = useAddressAutocomplete((address) => {
    onChange({
      ...data,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country || "US",
    });
  });

  return (
    <div className="py-6">
      <p className="text-gray-500 mb-6 text-sm">
        Enter your personal information. We&apos;ll use this to verify your identity.
      </p>

      <div className="space-y-6">
        {/* Owner Question */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-3 block">
            Are you applying as an owner of the company?
          </Label>
          <div className="flex gap-6">
            {["yes", "no"].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isOwner"
                  value={val}
                  checked={data.isOwner === val}
                  onChange={(e) => updateField("isOwner", e.target.value)}
                  className="w-4 h-4 accent-[#6d5dfc]"
                />
                <span className="text-gray-300 capitalize">{val}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-300">Legal first name</Label>
            <Input
              value={data.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="First name"
              className={inputCls}
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-300">Legal last name</Label>
            <Input
              value={data.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Last name"
              className={inputCls}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <Label className="text-sm font-medium text-gray-300">Date of Birth</Label>
          <div className="relative mt-2">
            <Input
              type="date"
              value={data.dob}
              onChange={(e) => updateField("dob", e.target.value)}
              className="h-12 bg-[#27272a] border-[#3f3f46] text-white pr-10 focus-visible:ring-[#6d5dfc]"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>

        {/* SSN Question */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-3 block">
            Do you have a Social Security Number (SSN)?
          </Label>
          <div className="flex gap-6">
            {["yes", "no"].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasSSN"
                  value={val}
                  checked={data.hasSSN === val}
                  onChange={(e) => updateField("hasSSN", e.target.value)}
                  className="w-4 h-4 accent-[#6d5dfc]"
                />
                <span className="text-gray-300 capitalize">{val}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Personal Address Section */}
        <div className="pt-6 border-t border-white/10">
          <h3 className="text-base font-semibold text-white mb-1">Personal address</h3>
          <p className="text-sm text-gray-500 mb-4">Provide your address.</p>

          {/* Street Address — Google Places Autocomplete attached */}
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-300">Street Address</Label>
            <Input
              ref={streetAddressRef}
              value={data.streetAddress}
              onChange={(e) => updateField("streetAddress", e.target.value)}
              placeholder="Start typing your address…"
              autoComplete="off"
              className={inputCls}
            />
          </div>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              data.streetAddress.trim()
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Apt./Suite no.</Label>
                  <Input
                    value={data.aptSuite}
                    onChange={(e) => updateField("aptSuite", e.target.value)}
                    placeholder="Apt./Suite no."
                    className={inputCls}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">City</Label>
                  <Input
                    value={data.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="City"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">State</Label>
                  <Select value={data.state} onValueChange={(v) => updateField("state", v)}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#27272a] border-[#3f3f46] max-h-60">
                      {US_STATES.map((s) => (
                        <SelectItem key={s.value} value={s.value} className="text-white focus:bg-white/10">
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Zip Code</Label>
                  <Input
                    value={data.zipCode}
                    onChange={(e) => updateField("zipCode", e.target.value)}
                    placeholder="Zip Code"
                    className={inputCls}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Country</Label>
                  <Select value={data.country} onValueChange={(v) => updateField("country", v)}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#27272a] border-[#3f3f46]">
                      <SelectItem value="US" className="text-white focus:bg-white/10">US</SelectItem>
                      <SelectItem value="CA" className="text-white focus:bg-white/10">Canada</SelectItem>
                      <SelectItem value="UK" className="text-white focus:bg-white/10">UK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Security Box */}
        <div className="bg-green-950/30 border border-green-800/50 rounded-lg p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-300 text-sm">Data Security</h4>
              <p className="text-sm text-green-400/80 mt-1">
                Your information is stored securely in our system. We do not and will never modify your accounts. If you have any concerns,{" "}
                <Link href="#" className="underline hover:text-green-300">Concierge</Link> is just a tap away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
