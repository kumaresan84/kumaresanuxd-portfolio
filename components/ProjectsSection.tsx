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
        className="group block overflow-hidden rounded-3xl border border-border bg-surface p-3 sm:p-4"
      >
        <div className="overflow-hidden rounded-2xl">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <ProjectVisual project={project} className="aspect-[950/622]" />
          </div>
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

/** Equal-size card used in the standard grid below the featured project. */
function GridCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.08, ease }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-3"
      >
        <div className="overflow-hidden rounded-2xl">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <ProjectVisual project={project} className="aspect-[4/3]" />
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 px-2 pb-1 pt-4">
          <div>
            <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{project.summary}</p>
          </div>
          <ArrowBadge size="sm" />
        </div>
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
        <div className="mt-14 space-y-6">
          <FeaturedCard project={featured} />
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <GridCard key={project.slug} project={project} i={i} />
              ))}
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
