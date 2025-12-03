"use client"

import React, { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
}

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-lg mx-4">
        <div className="bg-card/90 backdrop-blur-md border border-border/40 rounded-lg p-6 shadow-lg">
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          <div className="text-sm text-muted-foreground">{children}</div>

          <div className="mt-6 text-right">
            <button
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
