"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

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

const projects = [
  {
    title: "Novten",
    category: "Finances",
    description: "Responsive and modern landing page for Novten, designed following the corporate visual identity.",
    color: "from-[#3142dd] to-[#787365]",
    image: "/images/novten.png",
    url: "https://novten.company",
  },
  {
    title: "Olivia Pizzas & Empanadas",
    category: "Food",
    description: "Complete web presence for a local restaurant featuring online ordering, menu management, and a modern responsive design.",
    color: "from-[#f97316] to-[#ef4444]",
    image: "/images/olivia.png",
    url: "https://oliviapizzas.com.ar",
  },
  {
    title: "El Positivo",
    category: "Automotive",
    description: "Auto parts and spare parts store specialized in suspension and steering. Modern website with product catalog and quote form.",
    color: "from-[#dc2626] to-[#7f1d1d]",
    image: "/images/positivo.png",
    url: "https://elpositivosuspension.com.ar",
  },
  {
    title: "Rollos Baires",
    category: "Supply",
    description: "Direct supplier of thermal rolls, labels and tapes. Great prices, all sizes, personalized service for businesses.",
    color: "from-[#0d9488] to-[#0f766e]",
    image: "/images/rollos.png",
    url: "https://rollosbaires.com.ar",
  },
  {
    title: "AETIA",
    category: "Real Estate",
    description: "Real estate agency specialized in smart investments. Transform your assets with financial and real estate solutions.",
    color: "from-[#1e3a8a] to-[#3b82f6]",
    image: "/images/aetia.png",
    url: "https://grupoaetia.com",
  },
  {
    title: "Officeasy",
    category: "Construction",
    description: "Website offering 100% personalized and varied modular solutions. Foldable offices, stackable units, and expandable homes.",
    color: "from-primary to-[#818cf8]",
    image: "/images/officeasy.png",
    url: "https://officeasy.com.ar",
  },
]

export function PortfolioSection() {
  const { ref, inView } = useInView()

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px]" />

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className={`mb-16 transition-all duration-700 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            {"Portfolio"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            {"Client websites "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {"currently in use"}
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {"Freelance frontend projects — responsive designs and modern web experiences."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const projectWithLinks = project as typeof project & { url?: string; repoUrl?: string; image?: string }
            return (
              <div
                key={project.title}
                className={`group relative glass rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 ${
                  inView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${200 + i * 150}ms`, animationFillMode: "backwards" }}
              >
                {/* Gradient header / Image background */}
                <div
                  className={`h-48 relative overflow-hidden ${!projectWithLinks.image ? `bg-gradient-to-br ${project.color}` : ""}`}
                >
                  {projectWithLinks.image && (
                    <div
                      className="absolute inset-0 blur-[2px] group-hover:blur-none transition-[filter] duration-300"
                      style={{
                        backgroundImage: `url(${projectWithLinks.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent)]" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-white/80 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {projectWithLinks.url && (
                        <a
                          href={projectWithLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors cursor-pointer"
                          aria-label="View website"
                        >
                          <ExternalLink size={16} className="text-white" />
                        </a>
                      )}
                      {!projectWithLinks.url && (
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors cursor-pointer">
                          <ExternalLink size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
