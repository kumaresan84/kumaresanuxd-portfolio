"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-[18px] w-[18px]">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4 0 4.75 2.64 4.75 6.08V24h-4v-7.1c0-1.69-.03-3.87-2.36-3.87-2.37 0-2.73 1.84-2.73 3.74V24h-4V8z" />
      </svg>
    );
  }
  if (label === "X") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );
  }
  return <span className="text-sm font-medium">{label[0]}</span>;
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-ink-foreground/45">{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function ContactCTA() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-ink-foreground/50"
        >
          Get in touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-10 max-w-4xl font-display text-[12vw] font-medium leading-[1.0] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Let&apos;s{" "}
          <span className="mx-[0.12em] font-hand font-normal text-accent">create</span>{" "}
          incredible work together.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-16 grid grid-cols-2 gap-y-10 gap-x-8 border-t border-ink-foreground/15 pt-10 sm:grid-cols-4"
        >
          <Column label="Email">
            <a
              href={`mailto:${profile.email}`}
              className="text-ink-foreground transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </Column>

          <Column label="Call me">
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="text-ink-foreground transition-colors hover:text-accent"
            >
              {profile.phone}
            </a>
          </Column>

          <Column label="Resume">
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-ink-foreground transition-colors hover:text-accent"
            >
              {profile.name} CV
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Column>

          <Column label="Social">
            <div className="flex gap-3">
              {profile.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-foreground/25 text-ink-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </div>
          </Column>
        </motion.div>

        <div className="mt-16 border-t border-ink-foreground/15 pt-8 text-sm text-ink-foreground/50">
          © {new Date().getFullYear()} {profile.name} • All rights reserved.
        </div>
      </div>
    </footer>
  );
}
