"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle } from "lucide-react"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactSection() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

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

    if (contactRef.current) {
      const elements = contactRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpwvrywq"

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          _replyto: form.email,
          _subject: form.subject || "Portfolio Contact",
          message: form.message,
        }),
      })

      if (res.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        })
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        const data = await res.json().catch(() => ({}))
        const errorMessage = data.error || "Failed to send message. Please try again."
        toast({ title: "Error", description: errorMessage, variant: "destructive" })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rickyjason83@gmail.com",
      href: "mailto:rickyjason83@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+94 770865483",
      href: "tel:+94770865483",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Sri Lanka",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/RickyJasonVanderheyden",
      username: "@RickyJasonVanderheyden",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ricky-jason-vanderheyden-541685355/",
      username: "Ricky Jason Vanderheyden",
    },
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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

      <div ref={contactRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in-scale">
          <h2 className="text-4xl sm:text-5xl font-bold font-heading hologram-text mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Contact Form - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card
              className="animate-on-scroll card-hover-lift glass-card h-fit stagger-1"
              data-animation="slide-in-left"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Send className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">Send a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-border/50 focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-background/50 border-border/50 focus:border-primary resize-none"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Takes up 1 column on large screens */}
          <div className="space-y-4">
            {/* Contact Info */}
            <Card className="animate-on-scroll card-hover-lift glass-card stagger-2" data-animation="slide-in-right">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <h3 className="text-base font-semibold">Contact Info</h3>
                </div>

                <div className="space-y-3">
                  {contactInfo.map((contact) => (
                    <div key={contact.label} className="flex items-start gap-2">
                      <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 mt-0.5">
                        <contact.icon className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-xs mb-0.5">{contact.label}</p>
                        {contact.href !== "#" ? (
                          <a
                            href={contact.href}
                            className="text-muted-foreground hover:text-primary transition-colors text-xs break-all"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-xs">{contact.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="animate-on-scroll card-hover-lift glass-card stagger-3" data-animation="slide-in-right">
              <CardContent className="p-4">
                <h3 className="text-base font-semibold mb-3">Connect With Me</h3>
                <div className="space-y-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                        <social.icon className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-xs">{social.label}</p>
                        <p className="text-muted-foreground text-xs break-all">{social.username}</p>
                      </div>
                    </a>
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
