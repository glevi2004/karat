"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Check,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Gift,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Sparkles,
  User,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// ── Types ──────────────────────────────────────────────────────

type Business = {
  id: string
  name: string
  role: string
  initials: string
  color: string
}

type NavItem = {
  name: string
  href: string
  icon: React.ElementType
  hasSubmenu?: boolean
  isNew?: boolean
}

// ── Mock data ──────────────────────────────────────────────────

const businesses: Business[] = [
  { id: "1", name: "GroveBox", role: "Owner", initials: "GB", color: "bg-green-500" },
  { id: "2", name: "Acme Corp", role: "Admin", initials: "AC", color: "bg-blue-500" },
]

const mainNavItems: NavItem[] = [
  { name: "Banking", href: "/dashboard", icon: Building2 },
  { name: "Bookkeeping", href: "/dashboard/bookkeeping", icon: LayoutDashboard, hasSubmenu: true },
  { name: "Credit Card", href: "/dashboard/credit-card", icon: CreditCard, isNew: true },
  { name: "Perks", href: "/dashboard/perks", icon: Gift },
]

const otherNavItems: NavItem[] = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings, hasSubmenu: true },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

// ── Business Picker ────────────────────────────────────────────

function BusinessPicker({
  businesses,
  activeBusiness,
  onSelect,
  collapsed,
}: {
  businesses: Business[]
  activeBusiness: Business
  onSelect: (business: Business) => void
  collapsed: boolean
}) {
  if (collapsed) {
    return (
      <div className="flex justify-center">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold",
            activeBusiness.color,
          )}
        >
          {activeBusiness.initials}
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold flex-shrink-0",
              activeBusiness.color,
            )}
          >
            {activeBusiness.initials}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="text-sm font-medium text-foreground truncate">
              {activeBusiness.name}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {activeBusiness.role}
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Your Businesses</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => {}}>
          <Settings className="w-4 h-4 mr-2" />
          Business settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Wallet className="w-4 h-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Switch business</DropdownMenuLabel>
        {businesses.map((business) => (
          <DropdownMenuItem
            key={business.id}
            onClick={() => onSelect(business)}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                "w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-semibold",
                business.color,
              )}
            >
              {business.initials}
            </div>
            <span className="truncate flex-1">{business.name}</span>
            {activeBusiness.id === business.id && (
              <Check className="w-4 h-4 text-green-500" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="w-4 h-4 mr-2" />
          Create new business
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── User Switcher ──────────────────────────────────────────────

function UserSwitcher({
  user,
  collapsed,
}: {
  user: { name: string; email: string; initials: string }
  collapsed: boolean
}) {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-semibold">
          {user.initials}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Get Premium Button */}
      <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 transition-all text-sm font-medium shadow-sm">
        <Sparkles className="w-4 h-4" />
        <span>Get Premium</span>
      </button>

      {/* User Card */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-border bg-background/70 hover:bg-secondary transition-colors">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-semibold flex-shrink-0">
              {user.initials}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="text-sm font-medium text-foreground truncate">
                {user.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {user.email}
              </div>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Wallet className="w-4 h-4 mr-2" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ── Nav Item ───────────────────────────────────────────────────

function NavButton({
  item,
  isActive,
  collapsed,
}: {
  item: NavItem
  isActive: boolean
  collapsed: boolean
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        isActive
          ? "bg-secondary text-foreground font-medium"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        collapsed && "justify-center px-2",
      )}
      title={collapsed ? item.name : undefined}
    >
      <item.icon className="w-4 h-4 flex-shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{item.name}</span>
          {item.isNew && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 bg-purple-100 text-purple-700 hover:bg-purple-100"
            >
              New
            </Badge>
          )}
          {item.hasSubmenu && (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </>
      )}
    </Link>
  )
}

// ── Main Sidebar ───────────────────────────────────────────────

export function DashboardSidebar({
  children,
}: {
  children:
    | React.ReactNode
    | ((props: {
        sidebarCollapsed: boolean
        setSidebarCollapsed: (collapsed: boolean) => void
      }) => React.ReactNode)
}) {
  const pathname = usePathname()
  const [activeBusiness, setActiveBusiness] = useState(businesses[0])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const user = {
    name: "Gabriel Levi",
    email: "gabriel@grovebox.com",
    initials: "GL",
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex-shrink-0 bg-card border-r border-border flex flex-col transition-all duration-300",
          sidebarCollapsed ? "w-[60px]" : "w-[260px]",
        )}
      >
        {/* Header — Business Picker */}
        <div className="p-3 border-b border-border">
          <BusinessPicker
            businesses={businesses}
            activeBusiness={activeBusiness}
            onSelect={setActiveBusiness}
            collapsed={sidebarCollapsed}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavButton
                key={item.name}
                item={item}
                isActive={pathname === item.href}
                collapsed={sidebarCollapsed}
              />
            ))}
          </div>

          {/* Separator + Other section */}
          <div className="my-4 mx-1 border-t border-border" />

          {!sidebarCollapsed && (
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Other
              </span>
            </div>
          )}

          <div className="space-y-1">
            {otherNavItems.map((item) => (
              <NavButton
                key={item.name}
                item={item}
                isActive={pathname === item.href}
                collapsed={sidebarCollapsed}
              />
            ))}
          </div>
        </nav>

        {/* Footer — User Switcher */}
        <div className="border-t border-border p-3">
          <UserSwitcher user={user} collapsed={sidebarCollapsed} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex min-h-0 min-w-0 flex-col">
        {typeof children === "function"
          ? children({ sidebarCollapsed, setSidebarCollapsed })
          : children}
      </main>
    </div>
  )
}
