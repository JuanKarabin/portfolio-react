"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowDown, MapPin, Mail, Github, Linkedin } from "lucide-react"

export function HeroSection() {
  const [imageFlipped, setImageFlipped] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/15 rounded-full blur-[128px] animate-float delay-300" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Image - flip on hover */}
        <div
          className="relative group w-48 h-48 lg:w-64 lg:h-64"
          style={{ perspective: "1000px" }}
          onMouseEnter={() => setImageFlipped(true)}
          onMouseLeave={() => setImageFlipped(false)}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-gradient" />
          <div
            className="relative w-full h-full rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] transition-transform duration-500 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: imageFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front - photo (fades out immediately on hover so we never see it rotated) */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden transition-opacity duration-200"
              style={{
                opacity: imageFlipped ? 0 : 1,
                transform: "rotateY(0deg)",
                transitionProperty: "opacity",
                transitionDelay: "0ms",
              }}
            >
              <Image
                src="/images/me.jpeg"
                alt="Juan Karabin"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
            {/* Back - Argentina flag (appears when flip completes) */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden transition-opacity duration-200"
              style={{
                opacity: imageFlipped ? 1 : 0,
                transform: "rotateY(180deg)",
                pointerEvents: imageFlipped ? "auto" : "none",
                transitionProperty: "opacity",
                transitionDelay: imageFlipped ? "180ms" : "0ms",
              }}
            >
              <Image
                src="/images/arg.jpg"
                alt="Argentina"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center lg:text-left flex-1">
          <div className="animate-fade-in-up">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
              {"Hello, I'm"}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 text-balance">
              {"Juan "}
              <span className="bg-gradient-to-r from-primary via-[#818cf8] to-accent bg-clip-text text-transparent">
                {"Karabin"}
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up delay-200" style={{ animationFillMode: "backwards" }}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6 leading-relaxed">
              {"Fullstack Developer with 4+ years of experience crafting web and mobile applications. Engineering Student and passionate about building digital products."}
            </p>
          </div>

          <div className="animate-fade-in-up delay-400 flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8" style={{ animationFillMode: "backwards" }}>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              {"Buenos Aires, Argentina"}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground hidden sm:block" />
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} className="text-primary" />
              {"karabin.juan@gmail.com"}
            </span>
          </div>

          <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start" style={{ animationFillMode: "backwards" }}>
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-[#818cf8] text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              {"Get in Touch"}
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-6 py-3 rounded-lg glass glass-hover text-foreground text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              {"View Work"}
            </a>
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:ml-2 w-full sm:w-auto">
              <a
                href="https://github.com/JuanKarabin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/juan-karabin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <a
        href="#about"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  )
}
