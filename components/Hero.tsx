"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Drifting aurora backdrop. Colors come from the --aurora-* theme variables,
 * so it stays visible in both light and dark; reduced motion is handled in CSS.
 */
function HeroAurora() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
    </motion.div>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-end px-6 pb-16 pt-32 lg:px-10">
      <HeroAurora />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="relative mb-8 flex flex-wrap items-center gap-3 text-sm text-muted"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to opportunities
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} />
          {profile.location}
        </span>
      </motion.div>

      <h1 className="relative font-display text-[13vw] font-medium leading-[0.95] tracking-tight lg:text-[9.5vw]">
        <Line delay={0.1}>Designing</Line>
        <Line delay={0.22}>
          <span className="text-stroke">experiences</span>
        </Line>
        <Line delay={0.34}>
          that people <span className="text-accent">love.</span>
        </Line>
      </h1>

      <div className="relative mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="max-w-md text-lg leading-relaxed text-muted"
        >
          {profile.name} — {profile.title} with 16+ years crafting digital
          products across education, logistics, pharma, and fintech.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          href="#work"
          className="group inline-flex w-fit items-center gap-3 text-sm font-medium"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
          </span>
          See the work
        </motion.a>
      </div>
    </section>
  );
}
