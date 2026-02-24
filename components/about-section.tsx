"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, GraduationCap, Coffee } from "lucide-react"

function useInView(threshold = 0.2) {
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

const cards = [
  {
    icon: Code2,
    title: "Developer",
    description:
      "I have been working as a Fullstack SSR Developer for over four years at TDI (Tecnologia y Desarrollo Informatico), building robust web and mobile applications for clients across multiple industries.",
  },
  {
    icon: GraduationCap,
    title: "Engineer Student",
    description:
      "I am currently studying Systems Engineering at UTN FRBA (Universidad Tecnologica Nacional), deepening my understanding of software architecture, algorithms and systems design.",
  },
  {
    icon: Coffee,
    title: "Mate Lover",
    description:
      "When I'm not coding, you can find me drinking mate, exploring new technologies, contributing to open source, or working on personal side projects that push my skills further.",
  },
]

export function AboutSection() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className={`mb-16 transition-all duration-700 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            {"About Me"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {"Passionate about building "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {"digital experiences"}
            </span>
          </h2>
        </div>

        <div className={`mb-16 max-w-3xl transition-all duration-700 delay-200 ${inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationFillMode: "backwards" }}>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {"I'm a Fullstack Developer based in Buenos Aires, Argentina, with over 4 years of professional experience building web and mobile applications. I specialize in creating performant, scalable solutions using modern technologies. I enjoy tackling complex problems and turning ideas into clean, functional products that users love."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`glass glass-hover rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${300 + i * 150}ms`, animationFillMode: "backwards" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <card.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
