"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

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

const experiences = [
  {
    period: "2020 - 2021",
    role: "User Risk Analyst",
    company: "Mercado Libre",
    logo: "/images/meli-logo.png",
    description:
      "Analyzed and managed user risk operations at the leading e-commerce platform in Latin America, ensuring secure transactions and identifying fraud patterns.",
    tags: ["Risk Analysis", "E-commerce", "Security"],
  },
  {
    period: "2021 - Present",
    role: "Fullstack Web Developer",
    company: "Tecnologia y Desarrollo Informatico (TDI)",
    logo: "/images/LOGO_NUEVO_SOLO.svg",
    description:
      "Team lead for a group of developers dedicated to the technology migration for the tax management system of the province of Rio Negro.",
    tags: ["Team Lead", "Tax Systems", "Migration"],
  },
  {
    period: "2021 - Present",
    role: "Fullstack Web Developer",
    company: "TDI - Columbia University Project",
    logo: "/images/LOGO_NUEVO_SOLO.svg",
    description:
      "Participated in the development of an application to facilitate credit transfer between high school courses and Columbia University in the United States.",
    tags: ["Education", "Credit Transfer", "Web App"],
  },
  {
    period: "2021 - Present",
    role: "Fullstack Web Developer",
    company: "TDI - My Fitness App",
    logo: "/images/LOGO_NUEVO_SOLO.svg",
    description:
      "Participated in the development of web and mobile applications for My Fitness App, which provides a comprehensive training experience for athletes.",
    tags: ["Mobile", "Fitness", "Full-stack"],
  },
  {
    period: "2021 - Present",
    role: "Fullstack Web Developer",
    company: "TDI - Neuquen Tax System",
    logo: "/images/LOGO_NUEVO_SOLO.svg",
    description:
      "Support and maintenance provided for the Tax Administration system of the province of Neuquen, ensuring stability and performance.",
    tags: ["Maintenance", "Government", "Support"],
  },
]

export function ExperienceSection() {
  const { ref, inView } = useInView()

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[160px]" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className={`mb-16 transition-all duration-700 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            {"Experience"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {"My professional "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {"journey"}
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => {
              const isLeft = exp.company === "Mercado Libre"
              return (
                <div
                  key={`${exp.company}-${i}`}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 transition-all duration-700 ${
                    inView ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${200 + i * 150}ms`, animationFillMode: "backwards" }}
                >
                  {/* Dot */}
                  <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 z-10">
                    <div className="w-[16px] h-[16px] rounded-full bg-gradient-to-br from-primary to-accent border-[3px] border-background shadow-lg shadow-primary/30" />
                  </div>

                  {/* Left side */}
                  <div className={`md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pr-16 md:text-right md:order-first"}`}>
                    {isLeft ? (
                      <TimelineCard exp={exp} />
                    ) : (
                      <div className="hidden md:block">
                        <span className="text-sm font-mono text-primary">{exp.period}</span>
                      </div>
                    )}
                  </div>

                  {/* Right side */}
                  <div className={`md:w-1/2 pl-12 md:pl-16 ${isLeft ? "" : ""}`}>
                    {isLeft ? (
                      <div className="hidden md:block">
                        <span className="text-sm font-mono text-primary">{exp.period}</span>
                      </div>
                    ) : (
                      <TimelineCard exp={exp} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ exp }: { exp: typeof experiences[number] }) {
  return (
    <div className="glass glass-hover rounded-xl p-6 group hover:-translate-y-1 transition-all duration-300">
      <span className="text-xs font-mono text-primary mb-2 block md:hidden">{exp.period}</span>
      <div className="flex items-center gap-2 mb-2">
        <Image src={exp.logo} alt="" width={24} height={24} className="rounded object-contain shrink-0" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{exp.company}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
        {exp.role}
        <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exp.description}</p>
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
