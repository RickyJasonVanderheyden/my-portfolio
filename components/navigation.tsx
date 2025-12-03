"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Only track sections on home page
      if (pathname === "/") {
        const sections = navItems.map((item) => item.href.slice(1))
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })

        if (currentSection) {
          setActiveSection(currentSection)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    if (pathname !== "/") {
      // If not on home page, navigate to home first
      window.location.href = `/${href}`
    } else {
      // If on home page, scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleResumeDownload = () => {
    // Prefer static PDF in public folder
    const link = document.createElement("a")
    link.href = "/Resume.pdf"
    link.download = "Ricky_Jason_Vanderheyden_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold gradient-text hover:scale-105 transition-transform">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary",
                    activeSection === item.href.slice(1) && pathname === "/"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Resume Download Button */}
          <div className="hidden md:block">
            <Button onClick={handleResumeDownload} variant="outline" size="sm" className="animate-glow bg-transparent text-foreground border-border transition-all duration-300 hover:scale-105 hover:bg-[rgba(77,159,255,0.12)] hover:border-[rgba(77,159,255,0.6)] hover:text-primary">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "block px-3 py-2 text-base font-medium w-full text-left transition-colors",
                  activeSection === item.href.slice(1) && pathname === "/"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {item.name}
              </button>
            ))}
            <div className="px-3 py-2">
              <Button onClick={handleResumeDownload} variant="outline" size="sm" className="w-full bg-transparent text-foreground border-border transition-all duration-300 hover:scale-105 hover:bg-[rgba(77,159,255,0.12)] hover:border-[rgba(77,159,255,0.6)] hover:text-primary">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
