"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, X } from "lucide-react";
import { TikTokIcon, TwitchIcon, YouTubeIcon, InstagramIcon, XIcon } from "./icons";

interface ConnectAccountModalProps {
  open: boolean;
  platform: string | null;
  onClose: () => void;
  onBack: () => void;
  onConnect: () => void;
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  tiktok: TikTokIcon,
  twitch: TwitchIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

const platformNames: Record<string, string> = {
  tiktok: "TikTok",
  twitch: "Twitch",
  youtube: "YouTube",
  instagram: "Instagram",
  x: "X",
  other: "account",
};

export function ConnectAccountModal({ open, platform, onClose, onBack, onConnect }: ConnectAccountModalProps) {
  const Icon = platform ? platformIcons[platform] : null;
  const platformName = platform ? platformNames[platform] : "account";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Connect your account
            </DialogTitle>
            <div className="w-5" />
          </div>
        </DialogHeader>
        <div className="mt-8 text-center">
          {Icon && (
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Icon className="w-12 h-12" />
            </div>
          )}
          {!Icon && platform === "other" && (
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
              <span className="text-2xl">?</span>
            </div>
          )}
          <p className="text-sm text-gray-500 mb-8">
            Please start by logging into {platformName} below.
          </p>
          <Button
            onClick={onConnect}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium mb-3"
          >
            Add {platformName} account
          </Button>
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full h-12 border-gray-300 text-indigo-600 hover:bg-indigo-50"
          >
            Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
