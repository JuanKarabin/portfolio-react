"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react"

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

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "karabin.juan@gmail.com",
    href: "mailto:karabin.juan@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/JuanKarabin",
    href: "https://github.com/JuanKarabin/",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/juan-karabin",
    href: "https://www.linkedin.com/in/juan-karabin/",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Buenos Aires, Argentina",
    href: "#",
  },
]

export function ContactSection() {
  const { ref, inView } = useInView()

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-4xl px-6 text-center">
        <div className={`mb-12 transition-all duration-700 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            {"Contact"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {"Let's work "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {"together"}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            {"Have a project in mind or want to chat? Feel free to reach out. I'm always open to discussing new opportunities and ideas."}
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto transition-all duration-700 delay-300 ${inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationFillMode: "backwards" }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass glass-hover rounded-xl p-6 flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <link.icon size={18} className="text-primary" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{link.label}</p>
                <p className="text-sm text-foreground truncate">{link.value}</p>
              </div>
              {link.href !== "#" && (
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              )}
            </a>
          ))}
        </div>

        {/* CTA button */}
        <div className={`mt-12 transition-all duration-700 delay-500 ${inView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationFillMode: "backwards" }}>
          <a
            href="mailto:karabin.juan@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-[#818cf8] text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
          >
            <Mail size={18} />
            {"Send me an email"}
          </a>
        </div>
      </div>
    </section>
  )
}
