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
import { Info, Calendar } from "lucide-react";
import { InfoTooltip } from "./InfoTooltip";

interface BusinessInfoStepProps {
  data: {
    structure: string;
    legalName: string;
    hasDBA: string;
    ein: string;
    vertical: string;
    incorporationDate: string;
    incorporationState: string;
    hasOtherOwners: string;
    revenue: string;
    employees: string;
  };
  onChange: (data: any) => void;
}

const inputCls = "mt-2 h-12 bg-[#27272a] border-[#3f3f46] text-white placeholder:text-gray-600 focus-visible:ring-[#6d5dfc] focus-visible:border-[#6d5dfc]";
const selectTriggerCls = "mt-2 h-12 bg-[#27272a] border-[#3f3f46] text-white";

export function BusinessInfoStep({ data, onChange }: BusinessInfoStepProps) {
  const updateField = (field: string, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="py-6">

      {/* Info callout */}
      <div className="bg-indigo-950/40 border-l-4 border-indigo-500 p-4 mb-6 rounded-r-lg flex gap-3">
        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-indigo-300">
          If you haven&apos;t incorporated your business yet, choose Individual Sole Proprietor.
        </p>
      </div>

      <div className="space-y-6">
        {/* Business Structure */}
        <div>
          <Label className="text-sm font-medium text-gray-300 flex items-center">
            How is your business structured?
            <InfoTooltip content="Select the legal structure of your business entity" />
          </Label>
          <Select value={data.structure} onValueChange={(v) => updateField("structure", v)}>
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#27272a] border-[#3f3f46]">
              <SelectItem value="llc" className="text-white focus:bg-white/10">LLC (including most S Corps)</SelectItem>
              <SelectItem value="sole-proprietor" className="text-white focus:bg-white/10">Individual Sole Proprietor</SelectItem>
              <SelectItem value="c-corp" className="text-white focus:bg-white/10">C Corporation</SelectItem>
              <SelectItem value="partnership" className="text-white focus:bg-white/10">Partnership</SelectItem>
              <SelectItem value="nonprofit" className="text-white focus:bg-white/10">Nonprofit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Legal Business Name */}
        <div>
          <Label className="text-sm font-medium text-gray-300 flex items-center">
            Legal business name
            <InfoTooltip content="Enter your official business name as registered with the state" />
          </Label>
          <Input
            value={data.legalName}
            onChange={(e) => updateField("legalName", e.target.value)}
            placeholder="Enter legal business name"
            className={inputCls}
          />
        </div>

        {/* DBA */}
        <div>
          <Label className="text-sm font-medium text-gray-300 flex items-center mb-3">
            Does your business have a DBA?
            <InfoTooltip content="DBA (Doing Business As) is a name used for business operations that differs from the legal name" />
          </Label>
          <div className="flex gap-6">
            {["yes", "no"].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dba"
                  value={val}
                  checked={data.hasDBA === val}
                  onChange={(e) => updateField("hasDBA", e.target.value)}
                  className="w-4 h-4 accent-[#6d5dfc]"
                />
                <span className="text-gray-300 capitalize">{val}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Business EIN */}
        <div>
          <Label className="text-sm font-medium text-gray-300 flex items-center">
            Business EIN
            <InfoTooltip content="Employer Identification Number (EIN) is a unique nine-digit number assigned by the IRS" />
          </Label>
          <Input
            value={data.ein}
            onChange={(e) => updateField("ein", e.target.value)}
            placeholder="XX-XXXXXXX"
            className={inputCls}
          />
        </div>

        {/* Vertical info callout */}
        <div className="bg-indigo-950/40 border-l-4 border-indigo-500 p-4 rounded-r-lg flex gap-3">
          <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-300">
            If you are unsure, we recommend the Arts, Entertainment &amp; Recreation vertical for most content creator businesses.
          </p>
        </div>

        {/* Business Vertical */}
        <div>
          <Label className="text-sm font-medium text-gray-300 flex items-center">
            Business vertical
            <InfoTooltip content="Select the industry category that best describes your business" />
          </Label>
          <Select value={data.vertical} onValueChange={(v) => updateField("vertical", v)}>
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#27272a] border-[#3f3f46]">
              <SelectItem value="arts" className="text-white focus:bg-white/10">Arts, Entertainment &amp; Recreation</SelectItem>
              <SelectItem value="technology" className="text-white focus:bg-white/10">Technology</SelectItem>
              <SelectItem value="retail" className="text-white focus:bg-white/10">Retail</SelectItem>
              <SelectItem value="consulting" className="text-white focus:bg-white/10">Consulting</SelectItem>
              <SelectItem value="other" className="text-white focus:bg-white/10">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date and State of Incorporation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-300">Date of Incorporation</Label>
            <div className="relative mt-2">
              <Input
                type="date"
                value={data.incorporationDate}
                onChange={(e) => updateField("incorporationDate", e.target.value)}
                className={`h-12 bg-[#27272a] border-[#3f3f46] text-white pr-10 focus-visible:ring-[#6d5dfc]`}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-300">State of Incorporation</Label>
            <Select value={data.incorporationState} onValueChange={(v) => updateField("incorporationState", v)}>
              <SelectTrigger className={selectTriggerCls}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-[#27272a] border-[#3f3f46]">
                <SelectItem value="DE" className="text-white focus:bg-white/10">Delaware</SelectItem>
                <SelectItem value="CA" className="text-white focus:bg-white/10">California</SelectItem>
                <SelectItem value="NY" className="text-white focus:bg-white/10">New York</SelectItem>
                <SelectItem value="TX" className="text-white focus:bg-white/10">Texas</SelectItem>
                <SelectItem value="FL" className="text-white focus:bg-white/10">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Other owners */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-3 block">
            Does anyone else (excluding yourself) own 25% or more of the company?
          </Label>
          <div className="flex gap-6">
            {["yes", "no"].map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="owners"
                  value={val}
                  checked={data.hasOtherOwners === val}
                  onChange={(e) => updateField("hasOtherOwners", e.target.value)}
                  className="w-4 h-4 accent-[#6d5dfc]"
                />
                <span className="text-gray-300 capitalize">{val}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Revenue */}
        <div>
          <Label className="text-sm font-medium text-gray-300">
            How much money did your business make last year?
          </Label>
          <Select value={data.revenue} onValueChange={(v) => updateField("revenue", v)}>
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#27272a] border-[#3f3f46]">
              <SelectItem value="0-250k" className="text-white focus:bg-white/10">$0 – $250,000</SelectItem>
              <SelectItem value="250k-500k" className="text-white focus:bg-white/10">$250,000 – $500,000</SelectItem>
              <SelectItem value="500k-1m" className="text-white focus:bg-white/10">$500,000 – $1,000,000</SelectItem>
              <SelectItem value="1m+" className="text-white focus:bg-white/10">$1,000,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employees */}
        <div>
          <Label className="text-sm font-medium text-gray-300">
            How many people work for your business (including yourself &amp; contractors)?
          </Label>
          <Select value={data.employees} onValueChange={(v) => updateField("employees", v)}>
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-[#27272a] border-[#3f3f46]">
              <SelectItem value="0-10" className="text-white focus:bg-white/10">0 – 10</SelectItem>
              <SelectItem value="11-50" className="text-white focus:bg-white/10">11 – 50</SelectItem>
              <SelectItem value="51-100" className="text-white focus:bg-white/10">51 – 100</SelectItem>
              <SelectItem value="100+" className="text-white focus:bg-white/10">100+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-gray-600 text-center pt-2">
          By continuing, you acknowledge receipt of Karat&apos;s{" "}
          <a href="#" className="text-indigo-400 hover:underline">USA PATRIOT Act Disclosure</a>.
        </p>
      </div>
    </div>
  );
}
