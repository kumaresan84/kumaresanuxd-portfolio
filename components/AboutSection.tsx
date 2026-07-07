"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          01 — About
        </motion.p>

        <div className="space-y-8">
          {profile.bio.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              className={
                i === 0
                  ? "font-display text-2xl font-medium leading-snug sm:text-3xl"
                  : "max-w-2xl text-lg leading-relaxed text-muted"
              }
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
