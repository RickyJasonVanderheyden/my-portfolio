"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Search, Filter, ArrowLeft } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  githubUrl: string
  liveUrl: string
  featured: boolean
  year: string
}

const allProjects: Project[] = [
  {
    id: "vehicle-service-center",
    title: "Vehicle Service Center Management System",
    description:
      "A full-featured MERN stack application that handles vehicle service bookings, supplier and inventory management, staff administration, and finance tracking with PDF report generation.",
    longDescription:
      "This comprehensive management system streamlines vehicle service operations with features including customer booking management, real-time inventory tracking, staff scheduling, supplier management, and automated financial reporting. Built with modern MERN stack architecture and includes AI-powered insights for business optimization.",
    image: "/vehicle.png",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JSPDF", "Tailwind CSS", "Postman"],
    category: "Full Stack",
    githubUrl: "https://github.com/Thimeth0013/IT-Project-2025",
    liveUrl: "",
    featured: true,
    year: "2024",
  },
  {
    id: "online-help-desk",
    title: "Online Help Desk System for University",
    description:
      "A role-based university help desk application enables students to raise tickets, register for exams, book shuttle services, and make secure payments, while staff manage support, scheduling, payments, and system administration.",
    longDescription:
      "This university help desk system provides a comprehensive solution for student services with role-based access control. Students can submit support tickets, register for examinations, book shuttle services, and process payments securely. Staff members have dedicated dashboards for ticket management, exam scheduling, transportation coordination, and financial administration.",
      image: "/online help desk.png",
    technologies: ["Java", "JSP/Servlets", "JDBC", "MySQL", "Tailwind CSS", "JavaScript"],
    category: "Web Application",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Online-Help-Desk",
    liveUrl: "",
    featured: true,
    year: "2024",
  },
  {
    id: "smart-expense-tracker",
    title: "Smart Expense Tracker",
    description:
      "A Kotlin-based Android application designed to help users track daily expenses and incomes, manage budgets, and visualize spending habits using a clean and intuitive interface.",
    longDescription:
      "This Android application provides comprehensive expense management with features including income/expense tracking, budget planning, spending analytics, and visual reports. Built with modern Android architecture using Room database for local storage and Material Design principles for an intuitive user experience.",
    image: "/Screenshot_20250422_135942.png",
    technologies: ["Kotlin", "Android Studio", "Room Database", "SQLite", "SharedPreferences", "XML"],
    category: "Mobile App",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Finance-Tracker",
    liveUrl: "",
    featured: true,
    year: "2023",
  },
  {
    id: "identity-issuing-service",
    title: "Online Identity Issuing Service",
    description:
      "A PHP-based web application for managing identity card applications, featuring user registration, form submission, admin verification, and informational pages like About Us and Contact Us.",
    longDescription:
      "This web application streamlines the identity card application process with a user-friendly interface for citizens and an administrative panel for government officials. Features include secure user registration, document upload, application tracking, admin verification workflows, and automated status notifications.",
    image: "/identity-card-application-system.jpg",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "PhpMyAdmin", "XAMPP"],
    category: "Web Application",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Online-Identity-Issue-Service",
    liveUrl: "",
    featured: false,
    year: "2023",
  },
  // Additional projects for demonstration
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js, featuring 3D animations, dark theme, and interactive elements.",
    longDescription:
      "This portfolio website showcases my work and skills with a modern design featuring 3D elements, smooth animations, and a sophisticated dark theme. Built with Next.js and React Three Fiber for optimal performance and visual appeal.",
    image: "/me.PNG",
    technologies: ["Next.js", "React", "Three.js", "Tailwind CSS", "TypeScript"],
    category: "Web Application",
    githubUrl: "https://github.com/rickyjason/portfolio",
    liveUrl: "https://rickyjason.dev",
    featured: false,
    year: "2024",
  },
  {
    id: "sprint-kanban",
    title: "Sprint Kanban",
    description:
      "Sprint and task app built with Next.js and React, using TypeScript. Client and Next API-route-based auth use jsonwebtoken, bcryptjs, and cookies. Animations with GSAP and HTTP requests with axios.",
    longDescription:
      "A Sprint and task management application featuring boards, lists, and cards with drag-and-drop interactions. Built with Next.js and React (TypeScript), it implements JWT-based auth via Next API routes, password hashing with bcryptjs, animations with GSAP, and data persistence using MongoDB. Styled with Tailwind CSS and ready for deployment on Vercel.",
    image: "/catpo.PNG",
    technologies: ["React", "Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "GSAP", "axios", "JWT"],
    category: "Full Stack",
  githubUrl: "https://github.com/RickyJasonVanderheyden/Sprint-kanban",
  liveUrl: "https://sprint-kanban.vercel.app/",
    featured: false,
    year: "2024",
  },
  {
    id: "projects-tasks-management",
    title: "Projects & Tasks Management System",
    description:
      "Task and project management system built with Next.js and React (JavaScript/TypeScript), role-based access control, optimistic locking, and real-time UI updates.",
    longDescription:
      "A scalable projects and tasks management system using Node.js/Express and PostgreSQL (Sequelize ORM) for durable storage, role-based access control, optimistic locking for concurrent edits, Jest testing, and Dockerized deployment with Docker Compose. The frontend uses Next.js and React with secure JWT authentication and a responsive Tailwind CSS UI.",
    image: "/task.png",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Sequelize", "Docker", "JWT", "Jest"],
    category: "Full Stack",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Task-and-Project-management-React-Next-PostgreSql-Docker-",
    liveUrl: "",
    featured: false,
    year: "2024",
  },
  {
    id: "blog-assignment",
    title: "Blog Assignment",
    description:
      "Full-stack blog project with backend API docs, Prisma/Postgres, and a Next.js frontend—includes uploads and auth.",
    longDescription:
      "A full-stack blog assignment providing a backend (Express/Prisma/PostgreSQL) and a Next.js frontend. Features include JWT authentication, Prisma migrations, file uploads with optional Cloudinary support, Docker-based Postgres setup, and a documented API for posts, comments, uploads, and auth. The README includes install/run instructions, Prisma commands, and curl examples for common flows.",
    image: "/3.png",
    technologies: ["Node.js", "Express", "Next.js", "React", "PostgreSQL", "Prisma", "Docker", "JWT", "Cloudinary","Vercel","Railway"],
    category: "Full Stack",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Dev-Blog-Page",
    liveUrl: "https://blog-assignment-three-liart.vercel.app/",
    featured: false,
    year: "2025",
  },
]

const categories = ["All", "Full Stack", "Web Application", "Mobile App"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const filteredProjects = useMemo(() => {
    let filtered = allProjects

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchLower)),
      )
    }

    return filtered
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
             
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my complete portfolio of web applications, mobile apps, and full-stack solutions
            </p>
          </div>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Heads up">
            {modalMessage}
          </Modal>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, technologies..."
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
              Showing {filteredProjects.length} of {allProjects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden animate-slide-in-up flex flex-col h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.featured && (
                        <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.longDescription}</p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs border-primary/20 text-primary">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="flex-1 bg-black hover:bg-neutral-900 text-white border border-border/50 ring-1 ring-white/10 hover:ring-4 hover:ring-white/20 transition-shadow"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2 text-white" />
                            Code
                          </a>
                        </Button>

                        {project.liveUrl && (
                          project.id === "portfolio-website" ? (
                            <Button
                              size="sm"
                              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={() => {
                                setModalMessage("You're already viewing the live project 😄")
                                setModalOpen(true)
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2 text-primary-foreground" />
                              Live
                            </Button>
                          ) : (
                            <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2 text-primary-foreground" />
                                Live
                              </a>
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
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
