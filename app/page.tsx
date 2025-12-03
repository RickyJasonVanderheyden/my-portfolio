import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { CertificatesSection } from "@/components/certificates-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingResumeButton } from "@/components/floating-resume-button"

export default function Home() {
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
          
          {/* Floating Particles - Theme Aware */}
          {[
            { left: 10, top: 20, delay: 0, duration: 20 },
            { left: 85, top: 15, delay: 2, duration: 18 },
            { left: 25, top: 60, delay: 4, duration: 22 },
            { left: 70, top: 45, delay: 1, duration: 19 },
            { left: 15, top: 80, delay: 3, duration: 21 },
            { left: 90, top: 70, delay: 5, duration: 17 },
            { left: 45, top: 10, delay: 1.5, duration: 23 },
            { left: 60, top: 85, delay: 3.5, duration: 16 },
            { left: 30, top: 35, delay: 2.5, duration: 24 },
            { left: 80, top: 25, delay: 4.5, duration: 18 },
            { left: 5, top: 50, delay: 0.5, duration: 20 },
            { left: 95, top: 40, delay: 3.2, duration: 19 },
            { left: 40, top: 75, delay: 1.8, duration: 21 },
            { left: 75, top: 5, delay: 4.2, duration: 17 },
            { left: 20, top: 90, delay: 2.8, duration: 22 },
            { left: 55, top: 30, delay: 0.8, duration: 18 },
            { left: 35, top: 55, delay: 3.8, duration: 20 },
            { left: 65, top: 65, delay: 1.2, duration: 19 },
            { left: 50, top: 15, delay: 4.8, duration: 23 },
            { left: 85, top: 50, delay: 2.2, duration: 16 }
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/10 dark:bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      <Navigation />
      <ThemeToggle />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
      <FloatingResumeButton />
    </main>
  )
}
