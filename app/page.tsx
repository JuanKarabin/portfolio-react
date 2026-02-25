import { Navigation } from "@/components/navigation"
import { ParticlesBackground } from "@/components/particles-background"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ExperienceSection } from "@/components/experience-section"
import { StackSection } from "@/components/stack-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <ParticlesBackground />
      <WhatsAppFloat />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ExperienceSection />
      <StackSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
