# Kumaresan Munusamy — Portfolio

UX/UI design portfolio, built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All real content lives in `content/`, not scattered across components:

- `content/profile.ts` — name, title, bio, contact, resume link, social links
- `content/experience.ts` — work history timeline entries
- `content/projects.ts` — project cards + case studies, grouped by category

### Adding/finishing a case study

Each entry in `content/projects.ts` can optionally include `overview`, `uxProcess`, and `solution`.
If a project only has a `summary`, its case-study page shows a "coming soon" note instead —
add the missing fields to flesh it out. `slug` becomes the URL: `/projects/<slug>`.

**Recommended workflow**: drop your raw write-up in `content/case-studies/<slug>/notes.md`
and images in `public/projects/<slug>/`, then have Claude build the real page from them.
See [content/case-studies/README.md](content/case-studies/README.md) for the full guide.

## Adding your real images (step by step)

Every project shows abstract gradient placeholder art until you give it real images.
No component changes needed — it's all driven by two fields in `content/projects.ts`.

**1. Export from Figma**

- Select the frame → Export panel → export at **2x** as **PNG** (or WebP).
- Cover images look best around **1600×1000** (16:10). Case-study screens: **1200×900** (4:3).
- Keep file sizes reasonable (< 500 KB each if you can — use [squoosh.app](https://squoosh.app) to compress).

**2. Drop files into the project**

```
public/projects/<slug>/cover.png
public/projects/<slug>/screen-1.png
public/projects/<slug>/screen-2.png
```

Example: `public/projects/online-classroom/cover.png`

**3. Point the project at them** in `content/projects.ts`:

```ts
{
  slug: "online-classroom",
  ...
  cover: "/projects/online-classroom/cover.png",
  screens: [
    "/projects/online-classroom/screen-1.png",
    "/projects/online-classroom/screen-2.png",
  ],
}
```

- `cover` replaces the gradient art on the home-page card **and** the case-study hero.
- `screens` fills the "Selected screens" gallery at the end of the case study
  (until then it shows two placeholder tiles).

**Other assets to swap:**

- **Resume**: replace `public/resume-placeholder.pdf` (same filename, or update
  `resumeHref` in `content/profile.ts`).
- **Social links**: update the `href`s in `content/profile.ts` (LinkedIn/Behance/Dribbble
  are placeholder URLs right now).
- **Case-study copy**: the four web-app case studies besides "Online classroom" use
  plausible placeholder copy (marked with comments in `content/projects.ts`) — rewrite
  them with your real process and outcomes. The Icon/Art/Fun projects are placeholder
  entries; replace titles, summaries, and gradients with your actual work.

## Dark theme & hero animation

- The theme toggle (moon/sun in the header) persists to `localStorage` and respects the
  OS preference on first visit.
- The hero backdrop is an "aurora" animation — three blurred color fields drifting on slow
  CSS keyframes. Its colors come from the `--aurora-*` variables in `app/globals.css`
  (one set per theme), so it stays visible in both light and dark and re-tints
  automatically if you change the accent. It pauses for users with reduced motion enabled.

## Deploy

This is a standard Next.js app — [Vercel](https://vercel.com/new) is the path of least resistance:
push this repo to GitHub, then import it on Vercel. No environment variables or backend services
are required for the current version.
