import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { SoundManager } from "@/components/sound-manager"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingElements } from "@/components/floating-elements"
import { MouseFollower } from "@/components/mouse-follower"
import { EasterEgg } from "@/components/easter-egg"
import { LoadingScreen } from "@/components/loading-screen"
import { PageTransition } from "@/components/page-transition"
import { ErrorBoundary } from "@/components/error-boundary"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { DynamicFavicon } from "@/components/dynamic-favicon"
import "./globals.css"
import { Inter, Orbitron } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ricky Jason Vanderheyden - Full Stack Developer",
  description:
    "Portfolio of Ricky Jason Vanderheyden - IT Undergraduate specializing in full-stack and mobile development. Explore my projects, skills, and experience in modern web technologies.",
  keywords: [
    "Ricky Jason Vanderheyden",
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "Kotlin",
    "Mobile Development",
    "Web Development",
    "Portfolio",
    "SLIIT",
    "Sri Lanka",
  ],
  authors: [{ name: "Ricky Jason Vanderheyden" }],
  creator: "Ricky Jason Vanderheyden",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ricky Jason Portfolio",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rickyjason.dev",
    title: "Ricky Jason Vanderheyden - Full Stack Developer",
    description:
      "Portfolio of Ricky Jason Vanderheyden - IT Undergraduate specializing in full-stack and mobile development",
    siteName: "Ricky Jason Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricky Jason Vanderheyden - Full Stack Developer",
    description:
      "Portfolio of Ricky Jason Vanderheyden - IT Undergraduate specializing in full-stack and mobile development",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rickyjason.dev",
  },
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/me.PNG" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Enhanced theme script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const setTheme = (theme) => {
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.style.colorScheme = theme;
              };
              
              try {
                const saved = localStorage.getItem('theme');
                const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
                setTheme(saved || (prefersDark ? 'dark' : 'light'));
              } catch {
                setTheme('dark');
              }
            })()
          `
        }} />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ricky Jason Vanderheyden",
              "jobTitle": "Full Stack Developer",
              "description": "IT Undergraduate specializing in full-stack and mobile development",
              "url": "https://rickyjason.dev",
              "sameAs": [
                "https://github.com/RickyJasonVanderheyden",
                "https://linkedin.com/in/rickyjason"
              ],
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "SLIIT"
              },
              "knowsAbout": ["React", "Node.js", "TypeScript", "Mobile Development", "Full Stack Development"]
            })
          }}
        />
      </head>
      <body
        className={`font-sans ${inter.variable} ${orbitron.variable} ${GeistMono.variable} antialiased cyberpunk-theme`}
      >
        {/* Enhanced skip links for accessibility */}
        <nav className="sr-only focus-within:not-sr-only">
          <a href="#content" className="focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg transition-all">
            Skip to main content
          </a>
          <a href="#navigation" className="focus:absolute focus:top-2 focus:left-32 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg transition-all">
            Skip to navigation
          </a>
        </nav>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="cyberpunk-grid" />
          <div className="scanlines" />
        </div>
        <div className="relative z-10">
          <ScrollProgress />
          <FloatingElements />
          <MouseFollower />
          <SoundManager />
          <EasterEgg />
          <KeyboardShortcuts />
          <DynamicFavicon />
          <ErrorBoundary>
            <main id="content">
              <PageTransition>
                <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
              </PageTransition>
            </main>
          </ErrorBoundary>
          <Toaster />
          <Analytics />
        </div>
      </body>
    </html>
  )
}
