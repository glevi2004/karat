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
import { AlertTriangle } from "lucide-react";
import { useAddressAutocomplete } from "../hooks/useAddressAutocomplete";
import { US_STATES } from "../lib/usStates";

interface BusinessAddressStepProps {
  data: {
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

export function BusinessAddressStep({ data, onChange }: BusinessAddressStepProps) {
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
      <p className="text-gray-500 mb-4 text-sm">
        This is the physical address where your business operates in. This can be your residential address if you don&apos;t have an office yet.
      </p>

      {/* Warning Messages */}
      <div className="space-y-2 mb-6">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-400">We can&apos;t accept P.O. boxes or PMB for your physical address.</p>
        </div>
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-400">We can&apos;t accept addresses outside of the US.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Street Address — Google Places Autocomplete attached */}
        <div>
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
            {/* Apt/Suite and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-300">Apt./Suite no.</Label>
                <Input
                  value={data.aptSuite}
                  onChange={(e) => updateField("aptSuite", e.target.value)}
                  placeholder="305"
                  className={inputCls}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-300">City</Label>
                <Input
                  value={data.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="Newark"
                  className={inputCls}
                />
              </div>
            </div>

            {/* State, Zip, Country */}
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
                  placeholder="19713"
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
    </div>
  );
}
