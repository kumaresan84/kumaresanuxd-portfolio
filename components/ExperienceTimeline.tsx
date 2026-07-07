"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/experience";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
      >
        02 — Experience
      </motion.p>

      <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
        16 years, 6 teams
      </h2>

      <ol className="mt-12">
        {experience.map((entry, i) => (
          <motion.li
            key={entry.company + entry.period}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease }}
            className="group relative border-t border-border last:border-b"
          >
            <div className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-y-100" />
            <div className="relative grid gap-1 px-2 py-7 transition-colors duration-300 group-hover:text-ink-foreground sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6">
              <p className="text-sm text-muted transition-colors duration-300 group-hover:text-ink-foreground/60">
                {entry.period}
              </p>
              <div>
                <h3 className="font-display text-xl font-medium sm:text-2xl">
                  {entry.role}
                  {entry.current && (
                    <span className="ml-3 inline-block rounded-full bg-accent px-2.5 py-0.5 align-middle text-xs font-sans font-medium text-accent-foreground">
                      Now
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-muted transition-colors duration-300 group-hover:text-ink-foreground/60">
                  {entry.company}
                </p>
              </div>
              <p className="hidden text-sm text-muted transition-colors duration-300 group-hover:text-ink-foreground/60 sm:block">
                {entry.location}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
