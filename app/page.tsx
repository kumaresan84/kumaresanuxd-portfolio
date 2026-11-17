import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsSection from "@/components/ProjectsSection";
import AiDesignSection from "@/components/AiDesignSection";
import ContactCTA from "@/components/ContactCTA";
import { projects } from "@/content/projects";
import { withImages } from "@/lib/project-images";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <ProjectsSection projects={projects.map(withImages)} />
        <AboutSection />
        <ExperienceTimeline />
        <AiDesignSection />
      </main>
      <ContactCTA />
    </>
  );
}
