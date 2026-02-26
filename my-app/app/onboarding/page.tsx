"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  BusinessInfoStep,
  PersonalInfoStep,
  CompanyOfficerStep,
  BusinessAddressStep,
  PlatformVerificationStep,
  ReviewStep,
  PhylloModal,
  ConnectAccountModal,
} from "./components";
import { HelpCircle } from "lucide-react";
import Script from "next/script";
import { AIChatProvider, useAIChat } from "../dashboard/components/AIChatContext";
import { AIChatPanel } from "../dashboard/components/AIChatPanel";

// ─── sidebar navigation ───────────────────────────────────────────────────────

const SIDEBAR_STEPS = [
  { id: 1, label: "Business information" },
  { id: 2, label: "Leaders and owners" },
  { id: 3, label: "Business address" },
  { id: 4, label: "Verify your socials" },
  { id: 5, label: "Review" },
];

function getSidebarStep(s: number) {
  if (s <= 1) return 1;
  if (s <= 3) return 2;
  if (s === 4) return 3;
  if (s === 5) return 4;
  return 5;
}

const STEP_TITLES: Record<number, string> = {
  1: "Business information",
  2: "Personal information",
  3: "Company officer",
  4: "Business address",
  5: "Verify your main platform",
  6: "Confirm and review",
};

const STEP_SUBTITLES: Record<number, string> = {
  1: "General details",
  2: "Owner information",
  3: "Officer details",
  4: "Physical location",
  5: "Platform connection",
  6: "Application summary",
};

// ─── sidebar step dot ─────────────────────────────────────────────────────────

function StepDot({ state }: { state: "completed" | "active" | "upcoming" }) {
  if (state === "completed") {
    return (
      <div className="w-[18px] h-[18px] rounded-full bg-[#6d5dfc] flex items-center justify-center flex-shrink-0">
        <svg className="w-[10px] h-[10px] text-white" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="w-[20px] h-[20px] rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
        <div className="w-[8px] h-[8px] rounded-full bg-white" />
      </div>
    );
  }
  return (
    <div className="w-[14px] h-[14px] rounded-full border border-gray-600 flex-shrink-0" />
  );
}

// ─── support button (needs AIChatContext) ─────────────────────────────────────

function SupportButton() {
  const { setShowAI } = useAIChat();
  return (
    <button
      onClick={() => setShowAI(true)}
      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-200 transition-colors"
    >
      <HelpCircle className="w-4 h-4" />
      Support
    </button>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  return (
    <AIChatProvider>
      <OnboardingContent />
      <AIChatPanel dark />
    </AIChatProvider>
  );
}

function OnboardingContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPhylloModal, setShowPhylloModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [pendingPlatform, setPendingPlatform] = useState<string | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [businessData, setBusinessData] = useState({
    structure: "", legalName: "", hasDBA: "no", ein: "",
    vertical: "", incorporationDate: "", incorporationState: "",
    hasOtherOwners: "no", revenue: "", employees: "",
  });
  const [personalData, setPersonalData] = useState({
    isOwner: "yes", firstName: "", lastName: "", dob: "", hasSSN: "yes",
    streetAddress: "", aptSuite: "", city: "", state: "", zipCode: "", country: "US",
  });
  const [officerData, setOfficerData] = useState({ officer: "", title: "CEO" });
  const [businessAddress, setBusinessAddress] = useState({
    streetAddress: "", aptSuite: "", city: "", state: "", zipCode: "", country: "US",
  });

  // Fetch signup data and pre-fill overlapping fields
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((user) => {
        if (!user) return;
        // Pre-fill business info from signup
        setBusinessData((prev) => ({
          ...prev,
          legalName: user.companyName || prev.legalName,
          vertical: user.vertical || prev.vertical,
          employees: user.employees || prev.employees,
        }));
        // Pre-fill personal info from signup
        setPersonalData((prev) => ({
          ...prev,
          firstName: user.firstName || prev.firstName,
          lastName: user.lastName || prev.lastName,
        }));
        // Pre-fill officer with signup name
        setOfficerData((prev) => ({
          ...prev,
          officer: `${user.firstName} ${user.lastName}`.trim() || prev.officer,
        }));
      })
      .catch(() => {});
  }, []);

  const saveOnboardingData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch("/api/onboarding", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...businessData,
        ...personalData,
        officerName: officerData.officer,
        officerTitle: officerData.title,
        businessStreetAddress: businessAddress.streetAddress,
        businessAptSuite: businessAddress.aptSuite,
        businessCity: businessAddress.city,
        businessState: businessAddress.state,
        businessZipCode: businessAddress.zipCode,
        businessCountry: businessAddress.country,
        socialPlatform: connectedPlatforms.join(","),
        onboardingCompleted: true,
      }),
    }).catch(() => {});
  };

  const handlePlatformClick = (platform: string) => {
    if (connectedPlatforms.includes(platform)) return;
    setPendingPlatform(platform);
    setShowPhylloModal(true);
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(s => s + 1);
    }
  };
  const handleBack = () => currentStep > 1 && setCurrentStep(s => s - 1);
  const handlePhylloContinue = () => { setShowPhylloModal(false); setShowConnectModal(true); };
  const handleConnectAccount = () => {
    if (pendingPlatform) {
      setConnectedPlatforms(prev => [...prev, pendingPlatform]);
    }
    setShowConnectModal(false);
    setPendingPlatform(null);
  };
  const handleSubmit = async () => {
    await saveOnboardingData();
    setCurrentStep(7);
  };

  useEffect(() => {
    if (currentStep === 7) {
      router.push("/dashboard");
    }
  }, [currentStep, router]);

  const activeSidebarStep = getSidebarStep(currentStep);
  const footerContinueDisabled =
    (currentStep === 5 && connectedPlatforms.length === 0) ||
    (currentStep === 6 && !agreedToTerms);
  const footerLabel = currentStep === 6 ? "Confirm and apply" : "Save and continue";
  const footerAction = currentStep === 6 ? handleSubmit : handleNext;

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-[#0c0c10]">

        {/* ══════════════════════════════════════════════════════
            TOP BAR — full width
        ══════════════════════════════════════════════════════ */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
          <Link href="/">
            <img src="/logo.png" alt="Karat" className="h-7 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          </Link>
          <div className="flex items-center gap-5">
            <SupportButton />
            <div className="w-8 h-8 rounded-full bg-[#6d5dfc] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">GR</span>
            </div>
          </div>
        </header>

        {/* Mobile step progress bar */}
        <div className="lg:hidden px-6 py-3 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-300">{STEP_TITLES[currentStep]}</span>
            <span className="text-xs text-gray-600">{activeSidebarStep} of {SIDEBAR_STEPS.length}</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6d5dfc] rounded-full transition-all duration-300"
              style={{ width: `${(activeSidebarStep / SIDEBAR_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MIDDLE — sidebar + content (no divider)
        ══════════════════════════════════════════════════════ */}
        <div className="flex-1 flex overflow-hidden">

          {/* Left sidebar — hidden on mobile */}
          <aside className="w-[220px] flex-shrink-0 hidden lg:flex flex-col overflow-y-auto">

            <nav className="px-5 pt-8 flex-1">
              {SIDEBAR_STEPS.map((step, idx) => {
                const dotState =
                  activeSidebarStep > step.id ? "completed"
                  : activeSidebarStep === step.id ? "active"
                  : "upcoming";

                return (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-[1px]">
                      <StepDot state={dotState} />
                      {idx < SIDEBAR_STEPS.length - 1 && (
                        <div
                          className={`w-px my-[5px] ${activeSidebarStep > step.id ? "bg-[#6d5dfc]" : "bg-white/10"}`}
                          style={{ height: 28 }}
                        />
                      )}
                    </div>
                    <span className={`text-sm leading-tight pb-[28px] last:pb-0 ${
                      dotState === "active" ? "text-white font-semibold"
                      : dotState === "completed" ? "text-[#a89ffe] font-medium"
                      : "text-gray-600"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto px-5 pb-5">
              <p className="text-[10px] text-gray-700 leading-relaxed">
                Karat Banking services provided by Grasshopper Bank, N.A., Member FDIC.
              </p>
            </div>
          </aside>

          {/* Right content */}
          <main className="flex-1 overflow-y-auto">
            <div className={`mx-auto w-full px-4 sm:px-10 py-8 sm:py-10 ${currentStep === 6 ? "max-w-5xl" : "max-w-3xl"}`}>

              {/* Step heading */}
              <div className="mb-8">
                <h1 className="text-[28px] font-bold text-white leading-tight">
                  {STEP_TITLES[currentStep]}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{STEP_SUBTITLES[currentStep]}</p>
              </div>

              {currentStep === 1 && <BusinessInfoStep data={businessData} onChange={setBusinessData} />}
              {currentStep === 2 && <PersonalInfoStep data={personalData} onChange={setPersonalData} />}
              {currentStep === 3 && <CompanyOfficerStep data={officerData} onChange={setOfficerData} />}
              {currentStep === 4 && <BusinessAddressStep data={businessAddress} onChange={setBusinessAddress} />}
              {currentStep === 5 && <PlatformVerificationStep connectedPlatforms={connectedPlatforms} onPlatformClick={handlePlatformClick} />}
              {currentStep === 6 && <ReviewStep agreedToTerms={agreedToTerms} onChangeAgreedToTerms={setAgreedToTerms} />}
            </div>
          </main>
        </div>

        {/* ══════════════════════════════════════════════════════
            FOOTER — full width
        ══════════════════════════════════════════════════════ */}
        <footer className="flex-shrink-0 border-t border-white/[0.06] flex">
          {/* Desktop: spacer matching sidebar width */}
          <div className="w-[220px] flex-shrink-0 hidden lg:block" />
          {/* Buttons centered within the content column */}
          <div className="flex-1 py-4 min-w-0">
            <div className="max-w-3xl mx-auto px-4 sm:px-10 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="h-10 px-5 border border-white/15 text-gray-300 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-0 disabled:pointer-events-none"
            >
              Back
            </button>

            <span className="text-xs text-gray-600 tabular-nums">Step {currentStep} of 6</span>

            <button
              onClick={footerAction}
              disabled={footerContinueDisabled}
              className="h-10 px-6 bg-[#6d5dfc] hover:bg-[#5a4ddb] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {footerLabel}
            </button>
            </div>
          </div>
        </footer>
      </div>

      <PhylloModal open={showPhylloModal} onClose={() => { setShowPhylloModal(false); setPendingPlatform(null); }} onContinue={handlePhylloContinue} />
      <ConnectAccountModal
        open={showConnectModal} platform={pendingPlatform}
        onClose={() => { setShowConnectModal(false); setPendingPlatform(null); }}
        onBack={() => { setShowConnectModal(false); setShowPhylloModal(true); }}
        onConnect={handleConnectAccount}
      />
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
          onLoad={() => window.dispatchEvent(new Event("google-maps-loaded"))}
        />
      )}
    </TooltipProvider>
  );
}
