"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl"
      >
        About <span className="font-hand font-normal text-accent">me</span>
      </motion.h2>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* image — 50% */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-illustration.png"
            alt="Illustrated highlights — experienced UX designer, problem solving, drawing unique characters, watching movies"
            className="w-full"
          />
        </motion.div>

        {/* text — 50% */}
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
