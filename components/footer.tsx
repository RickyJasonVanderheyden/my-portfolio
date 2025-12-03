"use client"

import { Github, Linkedin, Mail, Heart, Code2, Rocket } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/RickyJasonVanderheyden",
      color: "hover:text-[#4d9fff]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ricky-jason-vanderheyden-541685355/",
      color: "hover:text-[#4d9fff]",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:rickyjason83@gmail.com",
      color: "hover:text-[#4d9fff]",
    },
  ]

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-primary/10">
      <div className="section-pattern" />
      <div className="section-dots" />
      <div className="cyber-grid opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold font-heading hologram-text">Ricky Jason</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Building innovative digital solutions with passion and precision.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Rocket className="w-4 h-4 text-primary" />
              <span>Available for freelance projects</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Connect</h3>
            <p className="text-muted-foreground mb-4">Let's build something great together</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg bg-primary/5 border border-primary/10 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:border-primary/30 group`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <span>© {currentYear} Ricky Jason Vanderheyden.</span>
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -z-10" />
      </div>
    </footer>
  )
}
