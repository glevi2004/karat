"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CompanyOfficerStepProps {
  data: {
    officer: string;
    title: string;
  };
  onChange: (data: any) => void;
}

const selectTriggerCls = "mt-2 h-12 bg-[#27272a] border-[#3f3f46] text-white";

export function CompanyOfficerStep({ data, onChange }: CompanyOfficerStepProps) {
  const updateField = (field: string, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="py-6">
      <p className="text-gray-500 mb-6 text-sm">
        Select an individual who can act as the business officer. This might be a CEO, CFO, President, Partner, or Member.
      </p>

      <div className="space-y-6">
        {/* Existing Owner Dropdown */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">
            Existing business owner
          </Label>
          <Select value={data.officer} onValueChange={(v) => updateField("officer", v)}>
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue placeholder="Select officer" />
            </SelectTrigger>
            <SelectContent className="bg-[#27272a] border-[#3f3f46]">
              <SelectItem value="gabriel-levi-ramos" className="text-white focus:bg-white/10">Gabriel Levi Ramos</SelectItem>
              <SelectItem value="add-new" className="text-white focus:bg-white/10">+ Add new officer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Title Dropdown */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">
            Title
          </Label>
          <Select value={data.title} onValueChange={(v) => updateField("title", v)}>
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent className="bg-[#27272a] border-[#3f3f46]">
              <SelectItem value="CEO" className="text-white focus:bg-white/10">CEO</SelectItem>
              <SelectItem value="CFO" className="text-white focus:bg-white/10">CFO</SelectItem>
              <SelectItem value="President" className="text-white focus:bg-white/10">President</SelectItem>
              <SelectItem value="Partner" className="text-white focus:bg-white/10">Partner</SelectItem>
              <SelectItem value="Member" className="text-white focus:bg-white/10">Member</SelectItem>
              <SelectItem value="Director" className="text-white focus:bg-white/10">Director</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Custom Officer Button */}
        <button className="w-full h-12 border border-white/15 text-gray-300 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
          Add a custom officer
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
