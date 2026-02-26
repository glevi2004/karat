"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import {
  ArrowUp,
  HelpCircle,
  X,
  Loader2,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAIChat, aiSuggestions } from "./AIChatContext"

export function AIChatPanel({ dark = false }: { dark?: boolean }) {
  const {
    showAI,
    setShowAI,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    sendMessage,
    sidebarWidth,
    setSidebarWidth,
  } = useAIChat()

  const [isResizing, setIsResizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSidebarSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  // Resize handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = window.innerWidth - e.clientX
      const constrainedWidth = Math.min(Math.max(280, newWidth), 800)
      setSidebarWidth(constrainedWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "ew-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing, setSidebarWidth])

  if (!showAI) return null

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "fixed right-0 top-0 z-50 h-full border-l shadow-xl transition-colors",
        isResizing ? "border-opacity-60" : "",
        dark
          ? "bg-[#131316] border-white/10 text-gray-100"
          : "bg-background border-border text-foreground",
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Invisible resize handle */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute left-0 top-0 h-full w-1 cursor-ew-resize -translate-x-0.5"
      />
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between border-b px-4 py-4",
          dark ? "border-white/10" : "border-border",
        )}>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded">
              <Sparkles className={cn("h-4 w-4", dark ? "text-purple-400" : "text-purple-600")} />
            </div>
            <span className="font-medium">Assistant</span>
          </div>
          <button
            onClick={() => setShowAI(false)}
            className={cn(
              "rounded-lg p-1 transition-colors",
              dark
                ? "text-gray-500 hover:bg-white/10 hover:text-gray-200"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className={cn("px-4 py-3 text-xs", dark ? "text-gray-500" : "text-muted-foreground")}>
          Responses are generated using AI and may contain mistakes.
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {messages.length === 0 ? (
            <div className="mb-4">
              <h4 className={cn("mb-3 text-sm font-medium", dark ? "text-gray-500" : "text-muted-foreground")}>
                Suggestions
              </h4>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                      dark
                        ? "border-white/10 bg-white/5 text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/10"
                        : "border-border bg-muted/50 text-violet-500 hover:border-violet-500/30 hover:bg-violet-500/10",
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-full max-w-[95%] flex-col gap-2",
                    message.role === "user" ? "ml-auto justify-end" : "",
                  )}
                >
                  <div
                    className={cn(
                      "flex w-fit max-w-full min-w-0 flex-col gap-2 overflow-hidden text-sm",
                      message.role === "user"
                        ? cn("ml-auto rounded-lg px-4 py-3", dark ? "bg-white/10 text-gray-100" : "bg-secondary text-foreground")
                        : dark ? "text-gray-200" : "text-foreground",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none whitespace-pre-wrap">{message.content}</div>
                    ) : (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={cn("flex items-center gap-2 text-sm", dark ? "text-gray-500" : "text-muted-foreground")}>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className={cn("border-t p-4", dark ? "border-white/10" : "border-border")}>
          <form onSubmit={handleSidebarSubmit} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className={cn(
                "w-full rounded-lg border px-4 py-3 pr-10 text-sm focus:border-violet-500/50 focus:outline-none disabled:opacity-50",
                dark
                  ? "border-white/10 bg-white/5 text-gray-100 placeholder-gray-600"
                  : "border-border bg-muted/50 text-foreground placeholder-muted-foreground",
              )}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-violet-500 p-1.5 text-white hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </form>

          <button className={cn(
            "mt-3 flex w-full items-center justify-center gap-2 text-xs transition-colors",
            dark ? "text-gray-600 hover:text-gray-300" : "text-muted-foreground hover:text-foreground",
          )}>
            <HelpCircle className="h-3.5 w-3.5" />
            Create support ticket
          </button>
        </div>
      </div>
    </aside>
  )
}
