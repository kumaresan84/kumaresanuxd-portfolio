"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

const ease = [0.22, 1, 0.36, 1] as const;

/** Renders the real cover image when set, otherwise gradient placeholder art. */
export function ProjectVisual({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  if (project.cover) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  return <PlaceholderArt project={project} className={className} />;
}

/** Abstract gradient art standing in for real screens until they're exported from Figma. */
export function PlaceholderArt({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const [from, to] = project.gradient;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      role="img"
      aria-label={`${project.title} preview placeholder`}
    >
      {/* abstract UI silhouette */}
      <div className="absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
          </div>
          <div className="mt-4 h-3 w-1/2 rounded bg-white/30" />
          <div className="mt-2 h-3 w-3/4 rounded bg-white/20" />
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="h-14 rounded-lg bg-white/15" />
            <div className="h-14 rounded-lg bg-white/25" />
            <div className="h-14 rounded-lg bg-white/15" />
          </div>
        </div>
      </div>
      <span className="absolute bottom-3 right-4 text-xs font-medium text-white/50">
        Placeholder — real shots coming
      </span>
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <ProjectVisual project={project} className="aspect-[16/10]" />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="rounded-full border border-border px-2.5 py-0.5">
                {project.tag}
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-medium tracking-tight group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 max-w-lg text-muted">{project.summary}</p>
          </div>
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
