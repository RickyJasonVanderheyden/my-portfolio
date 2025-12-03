"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, BookOpen, Award, Code, Heart } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationType = entry.target.getAttribute("data-animation") || "slide-in-up"
            entry.target.classList.add(`animate-${animationType}`)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (aboutRef.current) {
      const elements = aboutRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const educationPath = [
    {
      level: "O/L",
      title: "Ordinary Level",
      status: "Completed",
      year: "2020",
      icon: BookOpen,
    },
    {
      level: "A/L",
      title: "Advanced Level",
      subjects: "IT, Accounting, Economics",
      status: "Completed",
      year: "2022",
      icon: Award,
    },
    {
      level: "BSc",
      title: "BSc (Hons) in Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      status: "In Progress",
      year: "2023 - 2027",
      icon: GraduationCap,
    },
  ]

  const interests = [
    { icon: Code, text: "Full-Stack Development" },
    { icon: Heart, text: "User Experience Design" },
    { icon: BookOpen, text: "Continuous Learning" },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div ref={aboutRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate about crafting digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <Card className="animate-on-scroll card-hover-lift glass-card" data-animation="slide-in-left">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-3 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <Image
                        src="/ricky-profile.png"
                        alt="Ricky Jason Vanderheyden"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -inset-1 rounded-full border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold mb-2">Ricky Jason Vanderheyden</h3>
                    <p className="text-primary font-medium mb-2">IT Undergraduate & Full-Stack Developer</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Sri Lanka</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a motivated and detail-oriented IT undergraduate with a passion for creating innovative digital
                    solutions. My journey in technology began with curiosity about how things work behind the scenes,
                    and has evolved into a deep love for building applications that solve real-world problems.
                  </p>
                  <p>
                    Currently pursuing my BSc (Hons) in Information Technology at SLIIT, I specialize in full-stack. I believe in the power of clean code, thoughtful design, and user-centered
                    development approaches.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                    projects, or collaborating with fellow developers to bring innovative ideas to life.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interests */}
            <Card className="animate-on-scroll card-hover-lift glass-card" data-animation="slide-in-right">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">What I Love</h3>
                <div className="space-y-3">
                  {interests.map((interest, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-200">
                        <interest.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                        {interest.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>


            {/* Education Timeline */}
            <Card className="animate-on-scroll card-hover-lift glass-card" data-animation="slide-in-right">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Education</h3>
                </div>

                <div className="space-y-4">
                  {educationPath.map((education, index) => (
                    <div key={education.level} className="relative">
                      {/* Timeline line */}
                      {index < educationPath.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-primary/10" />
                      )}

                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 relative z-10">
                          <education.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold mb-1">{education.title}</h4>
                          {education.subjects && <p className="text-xs text-primary font-medium mb-1">{education.subjects}</p>}
                          {education.institution && (
                            <p className="text-xs text-muted-foreground mb-1 truncate">{education.institution}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{education.year}</p>
                            <Badge
                              variant={education.status === "In Progress" ? "default" : "outline"}
                              className="text-xs px-2 py-0.5"
                            >
                              {education.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
