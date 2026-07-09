"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { categories, type Project, type ProjectCategory } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection({ projects: allProjects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>("web-mobile");
  const projects = allProjects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
      >
        03 — Selected Work
      </motion.p>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Projects
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActive(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === category.id
                  ? "bg-foreground text-background"
                  : "border border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {projects.map((project, i) => (
            <div key={project.slug} className={i % 2 === 1 ? "sm:mt-20" : ""}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-14 rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          More coming soon — this shelf is being stocked.
        </p>
      )}
    </section>
  );
}
