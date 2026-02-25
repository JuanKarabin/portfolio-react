"use client"

import { useEffect, useRef } from "react"

type Particle = { x: number; y: number; vx: number; vy: number; size: number; opacity: number }

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, hasMoved: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const backgroundStars: Particle[] = []
    const foregroundStars: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (!mouseRef.current.hasMoved) {
        mouseRef.current.x = canvas.width / 2
        mouseRef.current.y = canvas.height / 2
      }
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.hasMoved = true
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Background stars - distant, faint, float subtly, don't follow mouse
    for (let i = 0; i < 120; i++) {
      backgroundStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.25 + 0.1,
      })
    }

    // Foreground stars - closer, brighter, follow the cursor
    for (let i = 0; i < 45; i++) {
      foregroundStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
      })
    }

    const MOUSE_INFLUENCE = 0.002
    const MAX_SPEED = 0.8

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Draw background stars first (distant layer)
      for (const p of backgroundStars) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`
        ctx.fill()
      }

      // Draw foreground stars (follow cursor, brighter)
      for (const p of foregroundStars) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 30) {
          const pull = MOUSE_INFLUENCE
          p.vx += (dx / dist) * pull
          p.vy += (dy / dist) * pull
        }
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  )
}
