"use client"

import { useState } from "react"
import {
  X,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Settings as SettingsIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "./components/SidebarTrigger"
import { useAIChat } from "./components/AIChatContext"

// ── Chart mock data ────────────────────────────────────────────

const chartData = [
  { month: "Mar", revenue: 30000, expenses: 10000, line: 22000 },
  { month: "Apr", revenue: 45000, expenses: 12000, line: 28000 },
  { month: "May", revenue: 35000, expenses: 15000, line: 20000 },
  { month: "Jun", revenue: 50000, expenses: 11000, line: 30000 },
  { month: "Jul", revenue: 48000, expenses: 18000, line: 25000 },
  { month: "Aug", revenue: 42000, expenses: 14000, line: 22000 },
  { month: "Sep", revenue: 55000, expenses: 20000, line: 28000 },
  { month: "Oct", revenue: 38000, expenses: 16000, line: 18000 },
  { month: "Nov", revenue: 45000, expenses: 13000, line: 24000 },
  { month: "Dec", revenue: 32000, expenses: 19000, line: 12000 },
  { month: "Jan", revenue: 52000, expenses: 15000, line: 30000 },
  { month: "Feb", revenue: 40000, expenses: 22000, line: 15000 },
]

const MAX_CHART_VALUE = 75000

// ── Dashboard Page ─────────────────────────────────────────────

export default function DashboardPage() {
  const [showBanner, setShowBanner] = useState(true)
  const [demoMode, setDemoMode] = useState(true)
  const { setShowAI } = useAIChat()

  return (
    <>
      {/* ── Header with Sidebar Trigger ────────────────────── */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-card flex-shrink-0">
        <SidebarTrigger />
        <button
          onClick={() => setShowAI(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Sparkles className="h-4 w-4 text-purple-500" />
          Ask AI
        </button>
      </header>

      {/* ── Scrollable Content ─────────────────────────────── */}
      <div className="flex-1 overflow-auto bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* ── Application Status ─────────────────────────────── */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Application status</h2>
            <Badge
              variant="outline"
              className="text-amber-600 border-amber-200 bg-amber-50 text-xs font-medium"
            >
              Missing information
            </Badge>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Looks like we&apos;re just missing a few pieces of information to process your application.
          </p>
          <button className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold rounded-lg border border-amber-200 transition-colors text-sm">
            Update information
          </button>
        </div>

        {/* ── Demo Mode Toggle ───────────────────────────────── */}
        <div className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Demo mode on</span>
            <Switch
              checked={demoMode}
              onCheckedChange={setDemoMode}
              className="switch-demo"
            />
          </div>
          <p className="text-sm text-gray-400">
            The data displayed is for demonstration purposes only and does not reflect real account activity.
          </p>
        </div>

        {/* ── AI Bookkeeping Banner ──────────────────────────── */}
        {showBanner && (
          <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center p-6 gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  Your money, organized instantly.
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  See where your money goes — business, personal, even tax-deductible items. Bookkeeping supercharged with AI.
                </p>
                <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Discover AI bookkeeping
                </button>
              </div>
              <div className="hidden md:flex w-52 h-32 items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-white/10 flex items-center justify-center">
                  <div className="w-36 h-24 rounded-md bg-white/10 border border-white/10" />
                </div>
              </div>
            </div>
            {/* Carousel dots */}
            <div className="flex justify-center gap-1.5 pb-4">
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>
          </div>
        )}

        {/* ── Welcome Message ────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Hi Gabriel Levi, welcome.</h1>
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs font-medium">
            Admin
          </Badge>
        </div>

        {/* ── Banking Overview Grid ──────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Checking Account */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-semibold text-gray-900">Checking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-0.5">Available balance</p>
              <p className="text-3xl font-bold text-gray-900 tracking-tight">
                $0<span className="text-xl">.00</span>
              </p>

              {/* Mini bar chart */}
              <div className="mt-6">
                <div className="mb-3">
                  <span className="text-xs text-gray-400 px-2 py-1 bg-gray-50 rounded border border-gray-100">
                    Last 90 days
                  </span>
                </div>
                <div className="h-20 flex items-end gap-[3px]">
                  {[35, 55, 25, 70, 45, 65, 40, 60, 50, 72, 35, 55].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-purple-200 rounded-t transition-all"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-semibold text-gray-900">Account info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mt-1">
                <InfoRow label="Account no." value="–" />
                <InfoRow label="Routing no." value="–" />
                <InfoRow label="Owner" value="Gabriel Levi Ramos" />
                <InfoRow label="Type" value="Checking" />
                <InfoRow label="Address" value="–" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Bookkeeping Section ────────────────────────────── */}
        <div className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold text-gray-900">Bookkeeping</h2>
              </div>
              <p className="text-sm text-gray-500">
                Your expenses, automatically organized by AI.
              </p>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Upgrade CTA */}
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Upgrade to AI Bookkeeping
          </button>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Revenue"
              value="$7,589.06"
              change="+84%"
              changeType="positive"
              vsLabel="vs. Jan"
              iconColor="text-blue-500"
            />
            <StatCard
              label="Expenses"
              value="$837.62"
              change="+96%"
              changeType="positive"
              vsLabel="vs. Jan"
              iconColor="text-green-500"
            />
            <StatCard
              label="Net Profit"
              value="$6,751.44"
              change="-72%"
              changeType="negative"
              vsLabel="vs. Jan"
            />
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-3">Transactions to review</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs font-medium">
                    12 pending
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profit & Loss Chart */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">Profit & Loss</CardTitle>
                <div className="flex items-center gap-5 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <span className="text-gray-500 text-xs">Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-300" />
                    <span className="text-gray-500 text-xs">Expenses</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <span className="text-gray-500 text-xs">Uncategorized</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-[11px] text-gray-400 text-right pr-1">
                  <span>75k</span>
                  <span>50k</span>
                  <span>25k</span>
                  <span>0</span>
                  <span>-25k</span>
                </div>

                {/* Chart area */}
                <div className="ml-12 h-full flex flex-col">
                  <div className="flex-1 relative">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((pct) => (
                      <div
                        key={pct}
                        className="absolute left-0 right-0 border-t border-gray-100"
                        style={{ top: `${pct}%` }}
                      />
                    ))}

                    {/* Bars + line points */}
                    <div className="absolute inset-0 flex items-end justify-around px-1">
                      {chartData.map((data, i) => {
                        const revenueH = (data.revenue / MAX_CHART_VALUE) * 80
                        const expenseH = (data.expenses / MAX_CHART_VALUE) * 80
                        return (
                          <div key={i} className="flex flex-col items-center flex-1 relative h-full justify-end pb-0">
                            <div className="flex gap-[2px] items-end">
                              <div
                                className="w-[10px] bg-purple-600 rounded-t"
                                style={{ height: `${revenueH}%` }}
                              />
                              <div
                                className="w-[10px] bg-purple-200 rounded-t"
                                style={{ height: `${expenseH}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Line overlay */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#6d5dfc"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        points={chartData.map((d, i) => {
                          const x = ((i + 0.5) / chartData.length) * 100
                          const y = 80 - (d.line / MAX_CHART_VALUE) * 80
                          return `${x}%,${y}%`
                        }).join(" ")}
                      />
                      {chartData.map((d, i) => {
                        const cx = ((i + 0.5) / chartData.length) * 100
                        const cy = 80 - (d.line / MAX_CHART_VALUE) * 80
                        return (
                          <circle
                            key={i}
                            cx={`${cx}%`}
                            cy={`${cy}%`}
                            r="4"
                            fill="white"
                            stroke="#6d5dfc"
                            strokeWidth="2"
                          />
                        )
                      })}
                    </svg>
                  </div>

                  {/* X-axis labels */}
                  <div className="h-8 flex justify-around pt-2">
                    {chartData.map((data, i) => (
                      <span key={i} className="text-[11px] text-gray-400 flex-1 text-center">
                        {data.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </>
  )
}

// ── Stat Card ──────────────────────────────────────────────────

function StatCard({
  label,
  value,
  change,
  changeType,
  vsLabel,
  iconColor,
}: {
  label: string
  value: string
  change: string
  changeType: "positive" | "negative"
  vsLabel: string
  iconColor?: string
}) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-1">
          {iconColor && (
            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", iconColor === "text-blue-500" ? "bg-blue-100" : "bg-green-100")}>
              <div className={cn("w-3 h-3 rounded-full", iconColor === "text-blue-500" ? "bg-blue-500" : "bg-green-500")} />
            </div>
          )}
          <p className="text-sm text-gray-500">{label}</p>
        </div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center gap-1.5 mt-1">
          {changeType === "positive" ? (
            <ArrowUpRight className="w-3 h-3 text-green-600" />
          ) : (
            <ArrowDownRight className="w-3 h-3 text-red-500" />
          )}
          <span className={cn("text-xs font-medium", changeType === "positive" ? "text-green-600" : "text-red-500")}>
            {change}
          </span>
          <span className="text-xs text-gray-400">{vsLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Info Row ───────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-sm text-gray-400 w-28 flex-shrink-0">{label}:</span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  )
}
