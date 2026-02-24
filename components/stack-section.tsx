"use client"

import { useEffect, useRef, useState } from "react"

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const categories = [
  {
    name: "Frontend",
    techs: [
      { name: "Angular", level: 95 },
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 100 },
      { name: "HTML/CSS", level: 100 },
      { name: "Bootstrap", level: 100 },
      { name: "Ionic", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "React", level: 80 }
    ],
    color: "from-primary to-[#818cf8]",
    bgColor: "primary",
  },
  {
    name: "Backend",
    techs: [
      { name: "Node.js", level: 95 },
      { name: "Express", level: 85 },
      { name: "NestJS", level: 80 },
      { name: "Python", level: 70 },
      { name: "REST APIs", level: 95 },
      { name: "GraphQL", level: 75 },
    ],
    color: "from-accent to-[#22d3ee]",
    bgColor: "accent",
  },
  {
    name: "Database & Tools",
    techs: [
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 90 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Docker", level: 70 },
      { name: "Git", level: 90 },
      { name: "AWS", level: 60 },
    ],
    color: "from-[#10b981] to-[#34d399]",
    bgColor: "[#10b981]",
  },
]

export function StackSection() {
  const { ref, inView } = useInView()

  return (
    <section id="stack" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className={`mb-16 transition-all duration-700 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            {"Tech Stack"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {"Technologies I "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {"work with"}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <div
              key={cat.name}
              className={`glass glass-hover rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + ci * 150}ms`, animationFillMode: "backwards" }}
            >
              <h3 className={`text-lg font-semibold mb-6 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                {cat.name}
              </h3>
              <div className="flex flex-col gap-5">
                {cat.techs.map((tech, ti) => (
                  <TechBar
                    key={tech.name}
                    name={tech.name}
                    level={tech.level}
                    color={cat.color}
                    inView={inView}
                    delay={300 + ci * 150 + ti * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechBar({
  name,
  level,
  color,
  inView,
  delay,
}: {
  name: string
  level: number
  color: string
  inView: boolean
  delay: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-foreground">{name}</span>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}
