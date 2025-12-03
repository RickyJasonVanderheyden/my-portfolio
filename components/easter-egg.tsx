"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Code, Coffee, Music } from "lucide-react"

export function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false)
  const [sequence, setSequence] = useState<string[]>([])

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code].slice(-konamiCode.length)
      setSequence(newSequence)

      if (newSequence.join(",") === konamiCode.join(",")) {
        setIsVisible(true)
        setSequence([])
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [sequence])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-card border-primary/50 animate-slide-in-up">
        <CardContent className="p-6 text-center">
          <div className="flex justify-between items-start mb-4">
            <div />
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-6">
            <Code className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold gradient-text mb-2">You Found It!</h3>
            <p className="text-muted-foreground">
              Congratulations on discovering the secret! You've unlocked the developer's easter egg.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Coffee className="w-4 h-4" />
              <span>Powered by coffee and late nights</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Music className="w-4 h-4" />
              <span>Built while listening to lo-fi beats</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Fun fact: This portfolio has {Math.floor(Math.random() * 1000) + 500} lines of code!
            </div>
          </div>

          <Button onClick={() => setIsVisible(false)} className="mt-6 bg-primary hover:bg-primary/90">
            Cool! Close
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
