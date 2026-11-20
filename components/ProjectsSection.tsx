"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, type Project, type ProjectCategory } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectCard";

const ease = [0.22, 1, 0.36, 1] as const;

function ArrowBadge({ size = "md" }: { size?: "md" | "sm" }) {
  const dim = size === "md" ? "h-12 w-12" : "h-10 w-10";
  return (
    <span
      className={`mt-0.5 flex ${dim} shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground`}
    >
      <ArrowUpRight size={size === "md" ? 18 : 16} />
    </span>
  );
}

/** Large hero card for the first project in the active category. */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-3xl border border-border bg-surface p-3 transition-transform duration-300 ease-out hover:-translate-y-[3px] sm:p-4"
      >
        <div className="overflow-hidden rounded-2xl">
          <ProjectVisual project={project} className="aspect-[950/622]" />
        </div>
        <div className="flex items-start justify-between gap-4 px-2 pb-1 pt-5 sm:px-3">
          <div>
            <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1.5 max-w-xl text-muted">{project.summary}</p>
          </div>
          <ArrowBadge />
        </div>
      </Link>
    </motion.div>
  );
}

/** Compact horizontal card used in the right-hand rail beside the featured project. */
function SideCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.08, ease }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 transition-transform duration-300 ease-out hover:-translate-y-[2px]"
      >
        <div className="w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
          <ProjectVisual project={project} className="aspect-[4/3]" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-medium tracking-tight transition-colors group-hover:text-accent sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{project.summary}</p>
        </div>
        <ArrowBadge size="sm" />
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection({ projects: allProjects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>("web-mobile");
  const projects = allProjects.filter((p) => p.category === active);
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
          Selected{" "}
          <span className="font-hand font-normal text-accent">Works</span>
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

      {featured ? (
        <div className="mt-10">
          {rest.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              <FeaturedCard project={featured} />
              <div className="flex flex-col gap-4">
                {rest.map((project, i) => (
                  <SideCard key={project.slug} project={project} i={i} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <FeaturedCard project={featured} />
            </div>
          )}
        </div>
      ) : (
        <p className="mt-14 rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          More coming soon — this shelf is being stocked.
        </p>
      )}
    </section>
  );
}
