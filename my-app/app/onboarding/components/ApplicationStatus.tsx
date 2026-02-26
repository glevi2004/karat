"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Menu, CreditCard, Gift, Settings, HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import { KaratLogo } from "./icons";

export function ApplicationStatus() {
  const [showGameModal, setShowGameModal] = useState(true);
  const [score, setScore] = useState(4);
  const [combo, setCombo] = useState(2);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Dashboard Preview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Dashboard Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <KaratLogo className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-semibold text-lg">Karat</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10 rounded-full">
              Get Premium
            </Button>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">GR</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 min-h-[600px]">
            <nav className="p-4 space-y-1">
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white shadow-sm text-slate-900">
                <span className="text-lg">🏦</span>
                <span className="font-medium">Banking</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white/60">
                <span className="text-lg">📊</span>
                <span>Bookkeeping</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white/60">
                <CreditCard className="w-5 h-5" />
                <span>Credit Card</span>
                <span className="ml-auto text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">New</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white/60">
                <Gift className="w-5 h-5" />
                <span>Perks</span>
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-3 text-xs text-gray-400 font-semibold uppercase mb-2">Other</p>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white/60">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white/60">
                  <HelpCircle className="w-5 h-5" />
                  <span>Help</span>
                </Link>
              </div>
            </nav>

            {/* Bottom user section */}
            <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">GG</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">GroveBox</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Application Status Banner */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold text-slate-900">
                  Application status:
                </h2>
                <span className="text-yellow-600 font-medium">Under Review</span>
              </div>
              <p className="text-gray-500">
                Looks like we need a bit more information to approve your application.
              </p>
              <div className="mt-4 bg-gray-100 rounded-lg h-12 w-full" />
            </div>

            {/* AI Bookkeeping Banner */}
            <div className="bg-slate-900 rounded-xl p-6 text-white mb-8 relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Checking Account</p>
                  <h3 className="text-2xl font-bold mb-2">AI Bookkeeping</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Automatic expense categorization and tax-ready reports
                  </p>
                  <Button variant="secondary" size="sm" className="bg-white text-slate-900 hover:bg-gray-100 rounded-full">
                    Discover AI bookkeeping
                  </Button>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900">Hi Gabriel 👋</h3>
            </div>

            {/* Account Overview */}
            <div className="grid grid-cols-2 gap-8">
              {/* Checking Account */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Checking Account</h4>
                <p className="text-xs text-gray-400 mb-1">Available balance</p>
                <p className="text-4xl font-bold text-slate-900 mb-6">$0.00</p>
                
                <div>
                  <p className="text-xs text-gray-400 mb-3">Last 90 days</p>
                  <div className="h-24 flex items-end gap-1">
                    {[40, 30, 50, 35, 45, 30, 40, 35, 50, 40, 45, 35].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-100 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Account info</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Routing no.:</span>
                    <span className="text-slate-900 font-medium">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Owner:</span>
                    <span className="text-slate-900 font-medium">Gabriel Levi Ramos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="text-slate-900 font-medium">Checking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address:</span>
                    <span className="text-slate-900 font-medium">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Modal */}
      <Dialog open={showGameModal} onOpenChange={setShowGameModal}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between mb-2">
                <DialogTitle className="text-lg font-semibold text-slate-900 leading-tight">
                  Give us a few minutes while we review your application
                </DialogTitle>
                <button 
                  onClick={() => setShowGameModal(false)}
                  className="text-gray-400 hover:text-gray-600 -mt-2 -mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                Collect as many dollar signs while you wait.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg font-bold text-indigo-600">Score: {score}</span>
                <span className="text-sm text-indigo-400 font-medium">+{combo} combo!</span>
              </div>
              <div className="h-48 bg-indigo-50/50 rounded-lg relative overflow-hidden border border-indigo-100">
                {/* Game elements */}
                <div className="absolute top-8 left-12 text-2xl animate-bounce">💰</div>
                <div className="absolute top-16 right-16 text-xl animate-pulse">💵</div>
                <div className="absolute bottom-12 left-1/3 text-lg animate-bounce" style={{ animationDelay: "0.3s" }}>💎</div>
                <div className="absolute top-1/2 right-1/4 text-xl animate-bounce" style={{ animationDelay: "0.6s" }}>💰</div>
                <div className="absolute bottom-8 right-8 text-2xl animate-pulse">💵</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
