"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

export function FloatingResumeButton() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-bounce-in">
      <div className="relative group">
        <Button
          onClick={() => {
            // Download resume logic here
            window.open("/resume.pdf", "_blank")
          }}
          size="lg"
          className="glass-card cyber-border bg-primary/90 hover:bg-primary text-black dark:text-white shadow-2xl hover:scale-110 transition-all duration-300 pr-12"
        >
          <Download className="w-5 h-5 mr-2 animate-bounce" />
          Download Resume
        </Button>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Close"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
