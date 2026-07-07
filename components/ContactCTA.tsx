"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactCTA() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          04 — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-6 font-display text-[11vw] font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Let&apos;s build something
          <br />
          <span className="text-accent">worth using.</span>
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          href={`mailto:${profile.email}`}
          className="group mt-12 inline-flex items-center gap-3 border-b border-ink-foreground/30 pb-2 text-xl transition-colors hover:border-accent hover:text-accent sm:text-2xl"
        >
          {profile.email}
          <ArrowUpRight
            size={22}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </motion.a>

        <div className="mt-20 flex flex-col gap-6 border-t border-ink-foreground/15 pt-8 text-sm text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            {profile.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-accent">
              {profile.phone}
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
