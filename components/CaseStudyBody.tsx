"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, Play } from "lucide-react";
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

/** A clickable, framed design screenshot that opens the lightbox. */
function Shot({
  src,
  alt,
  onOpen,
  priority,
}: {
  src: string;
  alt: string;
  onOpen: (src: string) => void;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      aria-label={`Open ${alt} in full view`}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:bg-background/20 group-hover:opacity-100">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground backdrop-blur">
          <Maximize2 size={18} />
        </span>
      </span>
    </button>
  );
}

/** A live Figma prototype that plays inline in an iframe on every device. */
function FigmaEmbed({
  block,
}: {
  block: Extract<CaseBlock, { type: "embed" }>;
}) {
  const embedUrl =
    block.src.replace("https://www.figma.com/", "https://embed.figma.com/") +
    "&embed-host=share";

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-[#0f0f0f]"
      style={{ aspectRatio: block.ratio ?? "4 / 5" }}
    >
      <iframe
        src={embedUrl}
        title={block.title}
        className="block h-full w-full border-0"
        allowFullScreen
        loading="lazy"
      />
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
    case "metaBar":
      return (
        <section className="mt-10">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {block.items.map((it) => (
              <div key={it.label} className="bg-surface p-5">
                <dt className="text-xs uppercase tracking-[0.15em] text-muted">{it.label}</dt>
                <dd className="mt-1.5 font-display text-base font-medium">{it.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "process":
      return (
        <section className="mt-16">
          <SectionLabel>{block.heading}</SectionLabel>
          {block.note && <p className="mt-3 max-w-3xl text-muted">{block.note}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-3">
            {block.steps.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium">
                  {step}
                </span>
                {i < block.steps.length - 1 && (
                  <ArrowRight size={14} className="text-muted/50" aria-hidden />
                )}
              </span>
            ))}
          </div>
        </section>
      );

    case "feature": {
      const wide = (block.layout ?? "wide") === "wide";
      const header = (
        <div>
          {block.label && <SectionLabel>{block.label}</SectionLabel>}
          <h2 className={`${block.label ? "mt-3" : ""} font-display text-2xl font-medium tracking-tight sm:text-3xl`}>
            {block.title}
          </h2>
          {block.body.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
      );

      if (wide) {
        return (
          <motion.section {...reveal} className="mt-20">
            <div className="max-w-3xl">{header}</div>
            <div className="mt-8 space-y-5">
              {block.images.map((src) => (
                <Shot key={src} src={src} alt={block.title} onOpen={onOpen} />
              ))}
            </div>
          </motion.section>
        );
      }

      return (
        <motion.section
          {...reveal}
          className="mt-20 grid items-center gap-10 lg:grid-cols-2"
        >
          <div className={block.flip ? "lg:order-2" : ""}>{header}</div>
          <div className={`space-y-5 ${block.flip ? "lg:order-1" : ""}`}>
            {block.images.map((src) => (
              <Shot key={src} src={src} alt={block.title} onOpen={onOpen} />
            ))}
          </div>
        </motion.section>
      );
    }

    case "cta":
      return (
        <section className="mt-10">
          <a
            href={block.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition-transform duration-300 ease-out hover:-translate-y-[2px]"
          >
            <Play size={16} className="fill-current" />
            {block.label}
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {block.note && <p className="mt-3 text-sm text-muted">{block.note}</p>}
        </section>
      );

    case "embed":
      return (
        <motion.section {...reveal} className="mt-20">
          <div className="max-w-3xl">
            {block.label && <SectionLabel>{block.label}</SectionLabel>}
            <h2 className={`${block.label ? "mt-3" : ""} font-display text-2xl font-medium tracking-tight sm:text-3xl`}>
              {block.title}
            </h2>
            {block.body?.map((p, i) => (
              <p key={i} className="mt-4 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <FigmaEmbed block={block} />
          </div>
          {block.note && <p className="mt-3 text-sm text-muted">{block.note}</p>}
        </motion.section>
      );

    case "impact":
      return (
        <section className="mt-20">
          <SectionLabel>{block.heading}</SectionLabel>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {block.items.map((it, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <p className="font-display text-2xl font-medium text-accent sm:text-3xl">
                  {it.stat}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{it.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      );

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
  moreProjects = [],
}: {
  project: Project;
  moreProjects?: Project[];
}) {
  // Flat list of every gallery image, in page order, for the lightbox to page through.
  const allImages = useMemo<LightboxImage[]>(() => {
    const out: LightboxImage[] = [];
    for (const b of project.blocks ?? []) {
      if (b.type === "gallery" && b.images?.length) {
        for (const src of b.images) out.push({ src, section: b.heading });
      }
      if (b.type === "feature" && b.images?.length) {
        for (const src of b.images) out.push({ src, section: b.label ?? b.title });
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
        className="mt-12 overflow-hidden rounded-2xl border border-border"
      >
        {project.coverHref ? (
          <a
            href={project.coverHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open the ${project.title} prototype in a new tab`}
            className="group relative block"
          >
            <ProjectVisual project={project} className="aspect-[950/622]" />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-300 group-hover:bg-background/25 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg">
                <Play size={15} className="fill-current" />
                Open prototype
                <ArrowUpRight size={15} />
              </span>
            </span>
          </a>
        ) : (
          <ProjectVisual project={project} className="aspect-[950/622]" />
        )}
      </motion.div>

      {project.blocks?.map((block, i) => (
        <Block key={i} block={block} slug={project.slug} onOpen={openSrc} />
      ))}

      {moreProjects.length > 0 && (
        <section className="mt-24 border-t border-border pt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-xl font-medium sm:text-2xl">More projects</h2>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
            >
              View all
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {moreProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group block transition-transform duration-300 ease-out hover:-translate-y-[3px]"
              >
                <div className="overflow-hidden rounded-xl border border-border">
                  <ProjectVisual project={p} className="aspect-[16/10]" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted">{p.tag}</p>
                <h3 className="mt-0.5 font-display text-base font-medium transition-colors group-hover:text-accent">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

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
