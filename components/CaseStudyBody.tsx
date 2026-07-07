"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { PlaceholderArt, ProjectVisual } from "@/components/ProjectCard";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CaseStudyBody({
  project,
  prevProject,
  nextProject,
}: {
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
}) {
  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-10">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} />
        All work
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
        <span className="rounded-full border border-border px-3 py-1">{project.tag}</span>
        <span>UX / UI Design</span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-6xl"
      >
        {project.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
      >
        {project.overview ?? project.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="mt-12 overflow-hidden rounded-3xl"
      >
        <ProjectVisual project={project} className="aspect-[16/9]" />
      </motion.div>

      {project.uxProcess && (
        <section className="mt-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Process</p>
          <h2 className="mt-3 font-display text-3xl font-medium">How it came together</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.uxProcess.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="font-display text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-medium">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {project.solution && (
        <section className="mt-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Solution</p>
          <h2 className="mt-3 font-display text-3xl font-medium">What shipped</h2>
          <div className="mt-10 space-y-4">
            {project.solution.map((point) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease }}
                className="rounded-2xl bg-ink p-8 text-ink-foreground"
              >
                <h3 className="font-display text-xl font-medium">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-foreground/70">{point.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {(project.uxProcess || project.solution) && (
        <section className="mt-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Screens</p>
          <h2 className="mt-3 font-display text-3xl font-medium">Selected screens</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {project.screens?.length
              ? project.screens.map((src) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease }}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screen`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                ))
              : [0, 1].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  >
                    <PlaceholderArt project={project} className="aspect-[4/3] rounded-2xl" />
                  </motion.div>
                ))}
          </div>
        </section>
      )}

      {!project.uxProcess && !project.solution && (
        <section className="mt-24 rounded-3xl border border-dashed border-border p-10 text-center text-muted">
          Full case study — process, solution, and screens — coming soon.
        </section>
      )}

      <div className="mt-24 flex items-center justify-between gap-6 border-t border-border pt-8">
        {prevProject ? (
          <Link href={`/projects/${prevProject.slug}`} className="group">
            <p className="flex items-center gap-2 text-sm text-muted">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              Previous
            </p>
            <p className="mt-1 font-display text-lg font-medium transition-colors group-hover:text-accent">
              {prevProject.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {nextProject && (
          <Link href={`/projects/${nextProject.slug}`} className="group text-right">
            <p className="flex items-center justify-end gap-2 text-sm text-muted">
              Next
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </p>
            <p className="mt-1 font-display text-lg font-medium transition-colors group-hover:text-accent">
              {nextProject.title}
            </p>
          </Link>
        )}
      </div>
    </article>
  );
}
