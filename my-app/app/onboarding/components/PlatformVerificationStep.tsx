"use client";

import { Check } from "lucide-react";
import { TikTokIcon, TwitchIcon, YouTubeIcon, InstagramIcon, XIcon } from "./icons";

interface PlatformVerificationStepProps {
  connectedPlatforms: string[];
  onPlatformClick: (platform: string) => void;
}

const platforms = [
  { id: "tiktok", name: "TikTok", icon: TikTokIcon },
  { id: "twitch", name: "Twitch", icon: TwitchIcon },
  { id: "youtube", name: "YouTube", icon: YouTubeIcon },
  { id: "instagram", name: "Instagram", icon: InstagramIcon },
  { id: "x", name: "X", icon: XIcon },
  { id: "other", name: "Other", icon: null },
];

export function PlatformVerificationStep({
  connectedPlatforms,
  onPlatformClick,
}: PlatformVerificationStepProps) {
  return (
    <div className="py-6">
      <p className="text-gray-500 mb-8 text-sm">
        Connect your social platforms so Karat can verify your creator identity. We obtain{" "}
        <strong className="text-gray-300">read-only access</strong> and will never manage your accounts.
      </p>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-300 mb-4">Select your social platforms</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {platforms.map((platform) => {
            const isConnected = connectedPlatforms.includes(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => onPlatformClick(platform.id)}
                className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                  isConnected
                    ? "border-emerald-500 bg-emerald-950/30"
                    : "border-[#3f3f46] hover:border-gray-500 hover:bg-white/5"
                }`}
              >
                {isConnected && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
                {platform.icon ? (
                  <platform.icon
                    className={`w-10 h-10 mb-3 ${
                      isConnected
                        ? platform.id === "tiktok" ? "text-white"
                        : platform.id === "twitch" ? "text-purple-400"
                        : platform.id === "youtube" ? "text-red-400"
                        : platform.id === "instagram" ? "text-pink-400"
                        : platform.id === "x" ? "text-white"
                        : "text-gray-400"
                        : platform.id === "tiktok" ? "text-gray-300"
                        : platform.id === "twitch" ? "text-purple-500"
                        : platform.id === "youtube" ? "text-red-500"
                        : platform.id === "instagram" ? "text-pink-500"
                        : platform.id === "x" ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#3f3f46] flex items-center justify-center mb-3">
                    <span className="text-gray-400 text-xs">?</span>
                  </div>
                )}
                <span className={`text-sm font-medium ${
                  isConnected ? "text-emerald-300" : "text-gray-400"
                }`}>
                  {platform.name}
                </span>
                {isConnected && (
                  <span className="text-[11px] text-emerald-400/70 mt-0.5">Connected</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {connectedPlatforms.length > 0 && (
        <p className="text-sm text-gray-500">
          {connectedPlatforms.length} platform{connectedPlatforms.length > 1 ? "s" : ""} connected
        </p>
      )}
    </div>
  );
}
