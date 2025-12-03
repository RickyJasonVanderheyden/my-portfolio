"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [typedText, setTypedText] = useState("")
  const fullText = "Full Stack Developer"

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/RickyJasonVanderheyden",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ricky-jason-vanderheyden-541685355/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:rickyjason83@gmail.com",
      label: "Email",
    },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="cyber-grid" />
      <div className="scanlines" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="data-line animate-data-stream"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float opacity-0"
            style={{
              left: `${15 + (i % 5) * 17}%`,
              top: `${20 + Math.floor(i / 5) * 20}%`,
              background:
                i % 2 === 0 ? "var(--electric-blue)" : "var(--neon-teal)",
              boxShadow: `0 0 8px ${i % 2 === 0 ? "var(--electric-blue)" : "var(--neon-teal)"}`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "8s",
              animationFillMode: "forwards",
            }}
          />
        ))}
      </div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-primary text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">
                Hello, I'm
              </span>
              <span className="block text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight">
                Ricky Jason
              </span>
              <span className="block hologram-text text-3xl sm:text-6xl md:text-7xl lg:text-9xl mt-2 font-black leading-none break-words">
                Vanderheyden
              </span>
            </h1>
            <div className="text-lg sm:text-2xl md:text-3xl text-primary font-medium flex items-center justify-center gap-2 px-4">
              <span className="text-center">{typedText}</span>
              <span className="typing-cursor" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light">
              Architect of Tomorrow's Code. Specializing in{" "}
              <span className="text-primary font-medium">full-stack and mobile development</span>. Building the future
              with <span className="text-secondary font-medium">React, Node.js, and Kotlin</span>.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass-card hover:bg-primary/10 transition-all duration-300 hover:scale-110 cyber-border"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-primary" />
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleScrollToProjects}
              size="lg"
              className="glass-card cyber-border bg-primary/10 hover:bg-primary/20 text-primary px-8 py-3 text-base font-medium uppercase tracking-wider"
            >
              View Projects
            </Button>
            <Button
              onClick={() => {
                const element = document.querySelector("#contact")
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
              variant="outline"
              size="lg"
              className="glass-card cyber-border bg-transparent text-secondary hover:bg-secondary/10 px-8 py-3 text-base font-medium uppercase tracking-wider"
            >
              Get In Touch
            </Button>
          </div>

          <div className="absolute bottom-8 right-8 animate-bounce">
            <button
              onClick={handleScrollToProjects}
              className="p-3 rounded-lg glass-card cyber-border hover:bg-primary/10 transition-all duration-300"
              aria-label="Scroll to projects"
            >
              <ArrowDown className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
