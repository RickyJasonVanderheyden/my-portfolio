"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award, Calendar, Building, ArrowRight } from "lucide-react"

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  image: string
  credentialUrl: string
  skills: string[]
  featured: boolean
}

const certificates: Certificate[] = [
  {
    id: "chatgpt-prompt-engineering",
    title: "ChatGPT Prompt Engineering for Developers",
    issuer: "DeepLearning.AI",
    date: "2024",
    description:
      "Comprehensive course on prompt engineering techniques for developers, covering best practices for AI integration and optimization.",
    image: "/openai.png",
    credentialUrl: "https://learn.deeplearning.ai/accomplishments/481d64a4-9224-4f33-b323-25b4b8dcd38b?usp=sharing/",
    skills: ["AI", "Prompt Engineering", "ChatGPT", "Machine Learning"],
    featured: false,
  },
  {
    id: "google-image-generation",
    title: "Introduction to Image Generation",
    issuer: "Google Cloud",
    date: "2024",
    description:
      "Foundational course on image generation techniques using Google Cloud AI services and machine learning models.",
    image: "/image generation.png",
    credentialUrl: "https://cloud.google.com/learn/certification",
    skills: ["Google Cloud", "AI", "Image Generation", "Machine Learning"],
    featured: false,
  },
  {
    id: "linkedin-nextjs",
    title: "Creating & Hosting Next.js Full Stack Site",
    issuer: "LinkedIn Learning",
    date: "2024",
    description:
      "Complete course on building and deploying full-stack applications using Next.js, covering both frontend and backend development.",
    image: "/nextjs.jpeg",
    credentialUrl: "https://lnkd.in/e-TZjXEs",
    skills: ["Next.js", "React", "Full Stack", "Deployment"],
    featured: true,
  },
  {
    id: "esoft-hardware-network",
    title: "Hardware and Network Course",
    issuer: "Esoft",
    date: "2023",
    description:
      "Comprehensive training on computer hardware components, network infrastructure, and system administration fundamentals.",
    image: "/hardware-and-networking-500x500.png",
    credentialUrl: "https://esoft.lk/",
    skills: ["Hardware", "Networking", "System Administration", "Troubleshooting"],
    featured: false,
  },
  {
    id: "kodekloud-docker",
    title: "Docker for Beginners",
    issuer: "KodeKloud",
    date: "2023",
    description:
      "Hands-on course covering Docker fundamentals, containerization concepts, and practical implementation strategies.",
      image: "/docker.jpeg",
      credentialUrl: "https://kodekloud.com",
    skills: ["Docker", "Containerization", "DevOps", "Deployment"],
    featured: true,
  },
  {
    id: "github-actions",
    title: "Github actions for beginners",
    issuer: "linkedin learning",
    date: "2025",
    description:
      "Learned how to automate tasks with GitHub Actions",
    image: "/github actions image.jpeg",
    credentialUrl: "https://www.linkedin.com/learning/practical-github-actions/creating-a-marketplace-github-action",
    skills: ["Github", "Actions", "Workflow", "Deployment","Testing","Automation"],
    featured: true,
  },
  {
    id: "github-actions",
    title: "Github actions for beginners",
    issuer: "linkedin learning",
    date: "2025",
    description:
      "Learned how to automate tasks with GitHub Actions",
    image: "aws.jpeg",
    credentialUrl: "https://aws.amazon.com/training/learn-about/devops/",
    skills: ["Automation", "CI/CD", "pipelines", "CloudFormation","versioning","Integration"],
    featured: false,
  },
  
]

export function CertificatesSection() {
  const certificatesRef = useRef<HTMLDivElement>(null)

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

    if (certificatesRef.current) {
      const elements = certificatesRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const featuredCertificates = certificates.filter((cert) => cert.featured)

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      <div className="section-pattern" />
      <div className="section-dots" />
      <div className="cyber-grid opacity-20" />

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
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 2 === 0 ? "var(--electric-blue)" : "var(--neon-teal)",
              boxShadow: `0 0 8px ${i % 2 === 0 ? "var(--electric-blue)" : "var(--neon-teal)"}`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div ref={certificatesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold font-heading hologram-text mb-6">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional certifications and courses that validate my expertise and commitment to continuous learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredCertificates.map((certificate, index) => (
            <Card
              key={certificate.id}
              className={`animate-on-scroll group card-hover-lift glass-card overflow-hidden stagger-${index + 1}`}
              data-animation="slide-in-up"
            >
              <div className="relative overflow-hidden">
                <img
                  src={certificate.image || "/placeholder.svg"}
                  alt={certificate.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 animate-pulse-glow">
                    Featured
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {certificate.title}
                  </h4>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Building className="w-4 h-4" />
                    <span>{certificate.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{certificate.date}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{certificate.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {certificate.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-xs border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 group/btn" asChild>
                  <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <Award className="w-4 h-4 mr-2" />
                    View Certificate
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-on-scroll" data-animation="bounce-in">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 group hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href="/certificates">
              <Award className="w-5 h-5 mr-2" />
              View All Certificates
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
