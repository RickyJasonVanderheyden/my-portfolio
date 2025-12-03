"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ExternalLink, Search, Filter, ArrowLeft, Award, Calendar, Building } from "lucide-react"
import Link from "next/link"

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  image: string
  credentialUrl: string
  skills: string[]
  category: string
  featured: boolean
}

const allCertificates: Certificate[] = [
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
    category: "AI & Machine Learning",
    featured: true,
  },
  {
    id: "google-cloud-image-generation",
    title: "Introduction to Image Generation",
    issuer: "Google Cloud",
    date: "2024",
    description: "Foundational course on image generation using Google Cloud AI services and machine learning models.",
    image: "/image generation.png",
    credentialUrl: "https://cloud.google.com/learn/certification",
    skills: ["Google Cloud", "Image Generation", "AI", "Machine Learning"],
    category: "Cloud Computing",
    featured: true,
  },
  {
    id: "linkedin-nextjs",
    title: "Creating & Hosting Next.js Full Stack Site",
    issuer: "LinkedIn Learning",
    date: "2024",
    description: "Complete guide to building and deploying full-stack applications using Next.js framework.",
    image: "/nextjs.jpeg",
    credentialUrl: "https://lnkd.in/e-TZjXEs",
    skills: ["Next.js", "React", "Full Stack", "Deployment"],
    category: "Web Development",
    featured: true,
  },
  {
    id: "esoft-hardware-network",
    title: "Hardware and Network Course",
    issuer: "Esoft",
    date: "2023",
    description: "Comprehensive training on computer hardware, networking fundamentals, and system administration.",
    image: "/hardware-and-networking-500x500.png",
    credentialUrl: "https://esoft.lk/",
    skills: ["Hardware", "Networking", "System Administration", "Troubleshooting"],
    category: "Hardware & Networking",
    featured: false,
  },
  {
    id: "kodekloud-docker",
    title: "Docker for Beginners",
    issuer: "KodeKloud",
    date: "2023",
    description:
      "Introduction to containerization with Docker, covering container management and deployment strategies.",
    image: "/docker.jpeg",
    credentialUrl: "https://kodekloud.com",
    skills: ["Docker", "Containerization", "DevOps", "Deployment"],
    category: "DevOps",
    featured: false,
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
    category: "DevOps",
    featured: false,
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
    category: "Cloud Computing",
    featured: false,
  },
]

const categories = [
  "All",
  "AI & Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Hardware & Networking",
  "DevOps",
]

export default function CertificatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCertificates, setFilteredCertificates] = useState(allCertificates)

  useEffect(() => {
    let filtered = allCertificates

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((cert) => cert.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredCertificates(filtered)
  }, [selectedCategory, searchTerm])

  return (
    <main className="min-h-screen relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient Background - Theme Aware */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-black dark:to-slate-900" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs - Theme Aware */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '20s' }} />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '25s', animationDelay: '5s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '30s', animationDelay: '10s' }} />
          
          {/* Subtle Grid Pattern - Theme Aware */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>
      </div>
      
      <Navigation />
      <ThemeToggle />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">Certifications</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional certifications and courses that showcase my commitment to continuous learning
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search certifications, skills, issuers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Filter:</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-transparent border-primary/30 text-primary hover:bg-primary/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredCertificates.length} of {allCertificates.length} certifications
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate, index) => (
              <Card
                key={certificate.id}
                className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {certificate.date}
                    </Badge>
                    {certificate.featured && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {certificate.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{certificate.issuer}</span>
                      <Calendar className="w-4 h-4 text-muted-foreground ml-2" />
                      <span className="text-sm text-muted-foreground">{certificate.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {certificate.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {certificate.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs border-primary/20 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90" asChild>
                    <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <Award className="w-4 h-4 mr-2" />
                      View Certificate
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results message */}
          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No certifications found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
