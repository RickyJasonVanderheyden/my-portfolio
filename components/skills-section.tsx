"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Code2,
  FileCode,
  Palette,
  Server,
  Zap,
  Database,
  Smartphone,
  Bot,
  Sparkles,
  Cloud,
  Settings,
  GitBranch,
  Container,
} from "lucide-react"

interface Skill {
  name: string
  category: string
  proficiency: number
  icon: React.ReactNode
}

const skillsData: Skill[] = [
  // Frontend
  { name: "React/Next.js", category: "FRONTEND", proficiency: 5, icon: <Code2 className="w-4 h-4" /> },
  { name: "TypeScript", category: "FRONTEND", proficiency: 5, icon: <FileCode className="w-4 h-4" /> },
  { name: "Tailwind CSS", category: "FRONTEND", proficiency: 5, icon: <Palette className="w-4 h-4" /> },

  // Backend
  { name: "Node.js", category: "BACKEND", proficiency: 4, icon: <Server className="w-4 h-4" /> },
  { name: "Express.js", category: "BACKEND", proficiency: 4, icon: <Zap className="w-4 h-4" /> },
  { name: "MongoDB", category: "BACKEND", proficiency: 4, icon: <Database className="w-4 h-4" /> },
  { name: "PostgreSQL", category: "BACKEND", proficiency: 4, icon: <Database className="w-4 h-4" /> },

  // Mobile
  { name: "Kotlin", category: "MOBILE", proficiency: 4, icon: <Smartphone className="w-4 h-4" /> },
  { name: "Android SDK", category: "MOBILE", proficiency: 4, icon: <Bot className="w-4 h-4" /> },

  // AI/ML
  { name: "ChatGPT/OpenAI", category: "AI/ML", proficiency: 4, icon: <Bot className="w-4 h-4" /> },
  { name: "Prompt Engineering", category: "AI/ML", proficiency: 5, icon: <Sparkles className="w-4 h-4" /> },

  // Cloud & Tools
  { name: "AWS", category: "CLOUD", proficiency: 4, icon: <Cloud className="w-4 h-4" /> },
  { name: "Docker", category: "CLOUD", proficiency: 4, icon: <Container className="w-4 h-4" /> },
  { name: "DevOps/CI/CD", category: "CLOUD", proficiency: 4, icon: <Settings className="w-4 h-4" /> },
  { name: "Git/GitHub", category: "TOOLS", proficiency: 5, icon: <GitBranch className="w-4 h-4" /> },
]

const categoryConfig = {
  FRONTEND: {
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    categoryColor: "text-cyan-400",
    dotColor: "bg-cyan-400",
    barColor: "bg-cyan-400",
    borderColor: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
  },
  BACKEND: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    categoryColor: "text-red-400",
    dotColor: "bg-red-400",
    barColor: "bg-red-400",
    borderColor: "border-red-500/20",
    hoverBorder: "hover:border-red-500/50",
  },
  MOBILE: {
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    categoryColor: "text-cyan-400",
    dotColor: "bg-cyan-400",
    barColor: "bg-cyan-400",
    borderColor: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
  },
  "AI/ML": {
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    categoryColor: "text-sky-400",
    dotColor: "bg-sky-400",
    barColor: "bg-sky-400",
    borderColor: "border-sky-500/20",
    hoverBorder: "hover:border-sky-500/50",
  },
  CLOUD: {
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    categoryColor: "text-yellow-400",
    dotColor: "bg-yellow-400",
    barColor: "bg-yellow-400",
    borderColor: "border-yellow-500/20",
    hoverBorder: "hover:border-yellow-500/50",
  },
  TOOLS: {
    iconBg: "bg-muted/50",
    iconColor: "text-muted-foreground",
    categoryColor: "text-muted-foreground",
    dotColor: "bg-muted-foreground",
    barColor: "bg-muted-foreground",
    borderColor: "border-muted",
    hoverBorder: "hover:border-muted-foreground/50",
  },
}

export function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null)

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

    if (skillsRef.current) {
      const elements = skillsRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent rounded-full blur-3xl animate-float" />
      </div>

      <div ref={skillsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4 font-[family-name:var(--font-heading)]">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I use to build exceptional digital experiences
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
          {skillsData.map((skill, index) => {
            const config = categoryConfig[skill.category as keyof typeof categoryConfig]
            return (
              <Card
                key={skill.name}
                className={`animate-on-scroll group relative overflow-hidden bg-card/80 backdrop-blur-sm border ${config.borderColor} ${config.hoverBorder} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-2">
                  {/* Icon and Category */}
                  <div className="flex items-start justify-between mb-1.5">
                    <div className={`p-1 rounded-sm ${config.iconBg} ${config.iconColor}`}>{skill.icon}</div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xs font-semibold text-white mb-1 group-hover:text-primary transition-colors leading-tight">
                    {skill.name}
                  </h3>

                  {/* Category Label */}
                  <p className={`text-xs font-semibold tracking-wider mb-1.5 ${config.categoryColor}`}>
                    {skill.category}
                  </p>

                  {/* Proficiency Section */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Proficiency</span>
                      {/* Proficiency Dots */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full ${
                              i < skill.proficiency ? config.dotColor : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Proficiency Bar */}
                    <div className="w-full h-0.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${config.barColor} transition-all duration-1000 ease-out`}
                        style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
