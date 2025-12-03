"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = document.documentElement.classList.contains("dark")
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement
      
      if (favicon) {
        // You can create different favicons for light/dark modes
        favicon.href = isDark ? "/favicon-dark.svg" : "/favicon-light.svg"
      }
    }

    // Update favicon when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateFavicon()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    // Initial update
    updateFavicon()

    return () => observer.disconnect()
  }, [])

  return null
}