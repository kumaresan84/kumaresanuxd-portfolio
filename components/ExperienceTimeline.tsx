"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/experience";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl"
      >
        Work <span className="font-hand font-normal text-accent">experience</span>
      </motion.h2>
      <p className="mt-3 text-muted">17 years · 6 teams</p>

      <ol className="mt-12">
        {experience.map((entry, i) => (
          <motion.li
            key={entry.company + entry.period}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease }}
            className="border-t border-border last:border-b"
          >
            <div className="grid gap-1 px-2 py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6">
              <p className="text-sm text-muted">{entry.period}</p>
              <div>
                <h3 className="font-display text-xl font-medium sm:text-2xl">
                  {entry.role}
                  {entry.current && (
                    <span className="ml-3 inline-block rounded-full bg-accent px-2.5 py-0.5 align-middle text-xs font-sans font-medium text-accent-foreground">
                      Now
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-muted">{entry.company}</p>
              </div>
              <p className="hidden text-sm text-muted sm:block">{entry.location}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
