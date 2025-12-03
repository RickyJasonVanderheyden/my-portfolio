"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K for search/navigation
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        // You could implement a command palette or search here
        const searchElement = document.querySelector("input[type='search']") as HTMLInputElement
        if (searchElement) {
          searchElement.focus()
        }
      }

      // Ctrl/Cmd + H for home
      if ((event.ctrlKey || event.metaKey) && event.key === "h") {
        event.preventDefault()
        router.push("/")
      }

      // Ctrl/Cmd + P for projects
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault()
        router.push("/projects")
      }

      // Ctrl/Cmd + C for certificates
      if ((event.ctrlKey || event.metaKey) && event.key === "c") {
        event.preventDefault()
        router.push("/certificates")
      }

      // Escape to close modals
      if (event.key === "Escape") {
        const modal = document.querySelector("[data-modal-open='true']")
        if (modal) {
          const closeButton = modal.querySelector("[data-modal-close]") as HTMLButtonElement
          closeButton?.click()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null
}