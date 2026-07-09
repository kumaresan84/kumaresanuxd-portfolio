"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { useIsDark } from "@/components/ThemeToggle";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Canvas hero backdrop with a distinct animation per theme:
 * dark — a glowing violet dot-wave terrain; light — flowing ink-line ribbons.
 * Renders a single static frame when the user prefers reduced motion.
 */
function HeroBackdrop() {
  const dark = useIsDark();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // dark: grid of dots displaced by two crossing sine waves, lit by height
    const drawDotWave = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const gap = 26;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      for (let iy = 0; iy <= rows; iy++) {
        for (let ix = 0; ix <= cols; ix++) {
          const wave =
            Math.sin(ix * 0.32 + t * 0.9) * Math.cos(iy * 0.26 - t * 0.65) * 0.7 +
            Math.sin((ix + iy) * 0.18 + t * 0.5) * 0.3;
          const alpha = 0.1 + (wave + 1) * 0.28;
          const radius = 0.8 + (wave + 1) * 1.15;
          ctx.beginPath();
          ctx.arc(ix * gap, iy * gap + wave * 11, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
          ctx.fill();
        }
      }
    };

    // light: three bands of layered sine ribbons in violet/plum/indigo ink
    const ribbonBands = [
      { rgb: "116, 64, 217", base: 0.28, amp: 72, k: 0.0045, speed: 0.55 },
      { rgb: "168, 85, 247", base: 0.52, amp: 92, k: 0.0037, speed: -0.42 },
      { rgb: "99, 102, 241", base: 0.76, amp: 62, k: 0.005, speed: 0.48 },
    ];

    const drawRibbons = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.4;
      for (const band of ribbonBands) {
        for (let i = 0; i < 9; i++) {
          ctx.beginPath();
          for (let x = -24; x <= w + 24; x += 8) {
            const y =
              h * band.base +
              i * 9 +
              Math.sin(x * band.k + t * band.speed + i * 0.35) * band.amp +
              Math.sin(x * band.k * 2.3 - t * band.speed * 0.8) * band.amp * 0.3;
            if (x === -24) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${band.rgb}, ${0.34 - i * 0.03})`;
          ctx.stroke();
        }
      }
    };

    const loop = (now: number) => {
      const t = now / 1000;
      if (dark) drawDotWave(t);
      else drawRibbons(t);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* calm zone behind the headline so the type stays crisp */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent" />
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
      <HeroBackdrop />
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
