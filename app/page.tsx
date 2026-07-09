import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsSection from "@/components/ProjectsSection";
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
        <AboutSection />
        <ExperienceTimeline />
        <ProjectsSection projects={projects.map(withImages)} />
      </main>
      <ContactCTA />
    </>
  );
}
