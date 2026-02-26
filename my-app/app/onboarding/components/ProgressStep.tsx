"use client";

interface ProgressStepProps {
  step: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

export function ProgressStep({ step, label, isActive, isCompleted }: ProgressStepProps) {
  return (
    <div className="flex-1">
      <div className={`h-1 rounded-full mb-3 transition-colors ${
        isActive || isCompleted ? "bg-indigo-600" : "bg-gray-200"
      }`} />
      <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
        isActive ? "text-indigo-600" : isCompleted ? "text-indigo-600" : "text-gray-400"
      }`}>
        Step {step}
      </div>
      <div className={`text-sm ${
        isActive ? "text-indigo-600 font-medium" : isCompleted ? "text-indigo-600" : "text-gray-400"
      }`}>
        {label}
      </div>
    </div>
  );
}
