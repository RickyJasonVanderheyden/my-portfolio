"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Create floating elements
    const createElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }
      setElements(newElements)
    }

    createElements()

    // Animate elements
    const animateElements = () => {
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
          y: element.y - element.speed,
          x: element.x + Math.sin(element.y * 0.01) * 0.5,
          // Reset position when element goes off screen
          ...(element.y < -10 && {
            y: window.innerHeight + 10,
            x: Math.random() * window.innerWidth,
          }),
        })),
      )
    }

    const interval = setInterval(animateElements, 50)
    const resizeHandler = () => createElements()

    window.addEventListener("resize", resizeHandler)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  )
}
