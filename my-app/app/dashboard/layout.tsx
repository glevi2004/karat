"use client"

import { Suspense } from "react"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { SidebarProvider } from "./components/SidebarContext"
import { AIChatProvider } from "./components/AIChatContext"
import { AIChatPanel } from "./components/AIChatPanel"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AIChatProvider>
      <Suspense fallback={null}>
        <DashboardSidebar>
          {({ sidebarCollapsed, setSidebarCollapsed }) => (
            <SidebarProvider
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
            >
              {children}
            </SidebarProvider>
          )}
        </DashboardSidebar>
      </Suspense>
      <AIChatPanel />
    </AIChatProvider>
  )
}
