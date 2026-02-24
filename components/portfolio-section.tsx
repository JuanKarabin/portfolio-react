"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"

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
    description: "Landing page responsive y moderna para Novten, diseñada siguiendo la identidad visual corporativa.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "from-[#3142dd] to-[#787365]",
    url: "https://novten.netlify.app",
    repoUrl: "https://github.com/JuanKarabin/novten",
  },
  {
    title: "Olivia Pizzas & Empanadas",
    category: "Food",
    description: "A complete web presence for a local restaurant featuring online ordering, menu management, and a modern responsive design.",
    tags: ["React", "Node.js", "Responsive"],
    color: "from-[#f97316] to-[#ef4444]",
  },
  {
    title: "Freelo Finanzas",
    category: "Finances",
    description: "Financial management platform with tools for budgeting, expense tracking, and financial analytics dashboards.",
    tags: ["Next.js", "TypeScript", "APIs"],
    color: "from-[#10b981] to-[#06b6d4]",
  },
  {
    title: "Officeasy",
    category: "Construction",
    description: "Web application for construction project management, including task scheduling, team coordination and progress tracking.",
    tags: ["React", "Node.js", "Database"],
    color: "from-primary to-[#818cf8]",
  },
  {
    title: "Kalli Digital",
    category: "Marketing",
    description: "Digital marketing agency website with modern design, service showcases, case studies, and integrated contact forms.",
    tags: ["Web Design", "SEO", "CMS"],
    color: "from-[#ec4899] to-[#8b5cf6]",
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
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const projectWithLinks = project as typeof project & { url?: string; repoUrl?: string }
            return (
              <div
                key={project.title}
                className={`group relative glass rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 ${
                  inView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${200 + i * 150}ms`, animationFillMode: "backwards" }}
              >
                {/* Gradient header */}
                <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent)]" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-white/80 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {projectWithLinks.repoUrl && (
                        <a
                          href={projectWithLinks.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors cursor-pointer"
                          aria-label="Ver repositorio"
                        >
                          <Github size={16} className="text-white" />
                        </a>
                      )}
                      {projectWithLinks.url && (
                        <a
                          href={projectWithLinks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors cursor-pointer"
                          aria-label="Ver sitio web"
                        >
                          <ExternalLink size={16} className="text-white" />
                        </a>
                      )}
                      {!projectWithLinks.url && !projectWithLinks.repoUrl && (
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
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
