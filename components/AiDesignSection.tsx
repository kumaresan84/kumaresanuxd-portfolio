"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

type Card = {
  no: string;
  label: string;
  image: string;
  title: string;
  body: string;
};

const cards: Card[] = [
  {
    no: "01",
    label: "Research & Synthesis",
    image: "/ai/research-synthesis.png",
    title: "Research synthesis",
    body: "I use AI to cluster hundreds of interview transcripts into themes in minutes, then apply human judgement to validate, merge and name them.",
  },
  {
    no: "02",
    label: "Rapid Prototyping",
    image: "/ai/production-prototypes.png",
    title: "Production-real prototypes",
    body: "I generate complex, realistic synthetic data so usability tests reveal real density and edge-case problems, not lorem-ipsum illusions.",
  },
  {
    no: "03",
    label: "Code-Bridging",
    image: "/ai/specs-that-ship.png",
    title: "Specs that ship",
    body: "I build AI tooling that turns design-system specs into component logic, closing the gap between design intent and what ships.",
  },
];

export default function AiDesignSection() {
  return (
    <section id="ai" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl"
      >
        How I{" "}
        <span className="font-hand font-normal text-accent">design with AI.</span>
      </motion.h2>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.article
            key={c.no}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="flex flex-col rounded-3xl border border-border bg-surface p-7"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {c.label}
              </p>
              <span className="font-display text-sm text-muted">{c.no}</span>
            </div>

            {/* hand-drawn illustration (panel matches the art's own background) */}
            <div className="mt-6 overflow-hidden rounded-2xl bg-[#fdfdfd]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={`${c.title} illustration`}
                className="aspect-[4/3] w-full object-contain"
                loading="lazy"
              />
            </div>

            <h3 className="mt-7 font-display text-xl font-medium sm:text-2xl">{c.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
          </motion.article>
        ))}
      </div>

      {/* open-to bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-surface px-7 py-6 sm:flex-row sm:items-center"
      >
        <p className="text-lg text-muted">
          Open to:{" "}
          <span className="font-medium text-foreground">
            Senior UX &amp; Design Leadership roles · Lead designer for AI products
          </span>
        </p>
        <a
          href={profile.resumeHref}
          download
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          <Download size={16} />
          Download Resume
        </a>
      </motion.div>
    </section>
  );
}
