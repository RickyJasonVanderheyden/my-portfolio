"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Filter, Eye, ArrowRight } from "lucide-react"
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
  year?: string
}

const projects: Project[] = [
  {
    id: "vehicle-service-center",
    title: "Vehicle Service Center Management System",
    description:
      "A full-featured MERN stack application that handles vehicle service bookings, supplier and inventory management, staff administration, and finance tracking with PDF report generation.",
    longDescription:
      "This comprehensive management system streamlines vehicle service operations with features including customer booking management, real-time inventory tracking, staff scheduling, supplier management, and automated financial reporting. Built with modern MERN stack architecture and includes AI-powered insights for business optimization.",
    image: "/vehicle.PNG",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JSPDF", "Tailwind CSS"],
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
    image: "/online help desk.PNG",
    technologies: ["Java", "JSP/Servlets", "JDBC", "MySQL", "Tailwind CSS", "JavaScript"],
    category: "Web Application",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Online-Help-Desk",
    liveUrl: "",
    featured: false,
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
    technologies: ["Kotlin", "Android Studio", "Room Database", "SQLite", "XML"],
    category: "Mobile App",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Finance-Tracker",
    liveUrl: "",
    featured: false,
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
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "PhpMyAdmin"],
    category: "Web Application",
    githubUrl: "https://github.com/RickyJasonVanderheyden/Online-Identity-Issue-Service",
    liveUrl: "",
    featured: false,
    year: "2023",
  },
   {
    id: "Dev-Blog",
    title: "Dev-Blog",
    description:
      "Full-stack blog project with backend API docs, Prisma/Postgres, and a Next.js frontend—includes uploads and auth.",
    longDescription:
      "A full-stack blog providing a backend (Express/Prisma/PostgreSQL) and a Next.js frontend. Features include JWT authentication, Prisma migrations, file uploads with optional Cloudinary support, Docker-based Postgres setup, and a documented API for posts, comments, uploads, and auth. The README includes install/run instructions, Prisma commands, and curl examples for common flows.",
    image: "/3.PNG",
    technologies: ["Node.js", "Express", "Next.js", "React", "PostgreSQL", "Prisma", "Docker", "JWT", "Cloudinary", "Vercel", "Railway"],
    category: "Full Stack",
    githubUrl: "",
    liveUrl: "https://blog-assignment-three-liart.vercel.app/",
    featured: true,
    year: "2025",
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
    featured: true,
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
 
]

const categories = ["All", "Full Stack", "Web Application", "Mobile App"]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory))
    }
  }, [selectedCategory])

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

    if (projectsRef.current) {
      const elements = projectsRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [filteredProjects])

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const displayProjects = selectedCategory === "All" ? featuredProjects : filteredProjects

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="section-pattern" />
      <div className="section-dots" />
      <div className="cyber-grid opacity-20" />

      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-primary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-40 h-40 bg-accent rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary rounded-full blur-3xl animate-particle-float" />
      </div>

      <div className="scanlines" />

      <div ref={projectsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold font-heading hologram-text mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work in full-stack development, mobile applications, and web solutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll" data-animation="bounce-in">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filter by:</span>
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`animate-on-scroll group card-hover-lift glass-card overflow-hidden stagger-${(index % 6) + 1} flex flex-col h-full`}
              data-animation="rotate-in"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
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
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-primary/20 text-primary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
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

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Heads up">
          {modalMessage}
        </Modal>

        {/* View All Projects Button */}
        <div className="text-center animate-on-scroll" data-animation="fade-in-scale">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 group hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/projects">
              <Eye className="w-5 h-5 mr-2" />
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}