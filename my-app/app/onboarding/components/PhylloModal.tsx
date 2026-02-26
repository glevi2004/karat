"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Shield, Eye, Lock } from "lucide-react";
import Link from "next/link";
import { KaratLogo, XIcon } from "./icons";

interface PhylloModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export function PhylloModal({ open, onClose, onContinue }: PhylloModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <button 
              onClick={onClose}
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <KaratLogo className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-400">×</span>
            <div className="flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded">
              <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✦</span>
              </div>
              <span className="text-sm font-medium text-indigo-900">Magic Social</span>
            </div>
            <span className="text-gray-400">×</span>
            <XIcon className="w-5 h-5" />
          </div>
          <DialogTitle className="text-center text-lg font-semibold text-slate-900">
            Karat uses MagicSocial (Phyllo powered) to link your accounts
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Your account is in safe hands</h4>
              <p className="text-sm text-gray-500">We won't post, modify or delete your account data.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Your consent matters</h4>
              <p className="text-sm text-gray-500">We only fetch the data that you have given approval for.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Your data is safe and secure</h4>
              <p className="text-sm text-gray-500">We use best practices for data encryption and storage.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-6 mb-4">
          By clicking "Continue" you agree to Phyllo's{" "}
          <Link href="#" className="text-indigo-600 hover:underline">End User Privacy Policy</Link>
        </p>
        <Button
          onClick={onContinue}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
