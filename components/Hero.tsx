"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center pb-16 pt-32">
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-10">
        {/* ── Left: copy ── */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to senior UX &amp; design leadership roles
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-8 max-w-xl font-display text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            Design isn&apos;t just how it looks —{" "}
            it&apos;s how it{" "}
            <span className="font-hand font-normal text-accent">works</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            UX/UI designer with{" "}
            <span className="font-medium text-foreground">17 years</span> solving
            user problems through simple, intuitive design. My work spans finance,
            e-commerce, healthcare, education, logistics, and agriculture —{" "}
            <span className="font-medium text-foreground">
              always curious about emerging tech and design trends.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Get in touch
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* ── Right: illustration ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="order-1 lg:order-2"
        >
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-illustration.png"
              alt={`Illustrated portfolio poster of ${profile.name} — UX design, design leadership and agentic UX`}
              className="h-auto w-full object-contain"
              width={1024}
              height={1024}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
