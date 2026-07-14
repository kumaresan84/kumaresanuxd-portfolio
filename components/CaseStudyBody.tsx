"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import type { CaseBlock, Project } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectCard";
import Lightbox, { type LightboxImage } from "@/components/Lightbox";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{children}</p>
  );
}

function Gallery({
  block,
  slug,
  onOpen,
}: {
  block: Extract<CaseBlock, { type: "gallery" }>;
  slug: string;
  onOpen: (src: string) => void;
}) {
  const images = block.images ?? [];
  const single = block.layout === "single";

  if (images.length === 0) {
    return (
      <div className="mt-8 flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
        <p className="font-display text-lg text-muted">{block.heading} — coming soon</p>
        <p className="mt-2 max-w-sm text-sm text-muted/80">
          {block.note ?? `Drop images into public/projects/${slug}/ to fill this section.`}
        </p>
      </div>
    );
  }

  return (
    <div className={single ? "mt-8" : "mt-8 grid gap-5 sm:grid-cols-2"}>
      {images.map((src) => (
        <motion.button
          key={src}
          {...reveal}
          onClick={() => onOpen(src)}
          aria-label={`Open ${block.heading} image in full view`}
          className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface ${
            single ? "aspect-[16/9]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={src}
            alt={`${block.heading} screen`}
            fill
            sizes={single ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:bg-background/25 group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground backdrop-blur">
              <Maximize2 size={18} />
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}

function Block({
  block,
  slug,
  onOpen,
}: {
  block: CaseBlock;
  slug: string;
  onOpen: (src: string) => void;
}) {
  switch (block.type) {
    case "prose":
      return (
        <section className="mt-16">
          {block.heading && <SectionLabel>{block.heading}</SectionLabel>}
          <div className={block.heading ? "mt-4 space-y-4" : "space-y-4"}>
            {block.body.map((p, i) => (
              <p
                key={i}
                className={
                  block.heading
                    ? "max-w-3xl text-lg leading-relaxed text-muted"
                    : "max-w-3xl text-xl leading-relaxed text-foreground sm:text-2xl"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      );

    case "bullets":
      return (
        <section className="mt-16">
          <SectionLabel>{block.heading}</SectionLabel>
          <ul className="mt-6 max-w-3xl space-y-4">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-4 text-lg leading-relaxed text-muted">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "labeled": {
      const cols = block.items.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
      return (
        <section className="mt-16">
          <SectionLabel>{block.heading}</SectionLabel>
          <div className={`mt-8 grid gap-5 ${cols}`}>
            {block.items.map((item, i) => (
              <motion.div
                key={item.label}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="font-display text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-medium">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      );
    }

    case "meta":
      return (
        <section className="mt-16">
          <SectionLabel>{block.heading}</SectionLabel>
          <div className="mt-5 flex flex-wrap gap-2">
            {block.body.split(",").map((chip, i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted"
              >
                {chip.trim().replace(/\.$/, "")}
              </span>
            ))}
          </div>
        </section>
      );

    case "gallery":
      return (
        <section className="mt-16">
          <SectionLabel>{block.heading}</SectionLabel>
          <Gallery block={block} slug={slug} onOpen={onOpen} />
        </section>
      );
  }
}

export default function CaseStudyBody({
  project,
  prevProject,
  nextProject,
}: {
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
}) {
  // Flat list of every gallery image, in page order, for the lightbox to page through.
  const allImages = useMemo<LightboxImage[]>(() => {
    const out: LightboxImage[] = [];
    for (const b of project.blocks ?? []) {
      if (b.type === "gallery" && b.images?.length) {
        for (const src of b.images) out.push({ src, section: b.heading });
      }
    }
    return out;
  }, [project.blocks]);

  const indexBySrc = useMemo(
    () => new Map(allImages.map((im, i) => [im.src, i])),
    [allImages],
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openSrc = (src: string) => setOpenIndex(indexBySrc.get(src) ?? null);
  const count = allImages.length;

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
        {project.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="mt-12 overflow-hidden rounded-3xl"
      >
        <ProjectVisual project={project} className="aspect-[16/9]" />
      </motion.div>

      {project.blocks?.map((block, i) => (
        <Block key={i} block={block} slug={project.slug} onOpen={openSrc} />
      ))}

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

      <Lightbox
        images={allImages}
        index={openIndex}
        title={project.title}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex((i) => (i === null ? null : (i - 1 + count) % count))}
        onNext={() => setOpenIndex((i) => (i === null ? null : (i + 1) % count))}
      />
    </article>
  );
}
