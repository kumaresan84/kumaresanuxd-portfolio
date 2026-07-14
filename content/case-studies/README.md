# Case-study source material

This folder is **your drop zone**. Nothing here is rendered on the site — it's the raw
material Claude (or you) turns into the real case-study pages in `content/projects.ts`.

## Folder structure

```
content/case-studies/          ← write-ups & reference (this folder)
  _template.md                 ← copy this for each new project
  online-classroom/
    notes.md                   ← the case-study story in your own words
    (anything else useful: research.pdf, personas.png, links…)
  logistics-app/
    notes.md
  ...

public/projects/               ← images that actually render on the site
  online-classroom/
    cover.png                  ← ~1600×1000 (card + case-study hero)
    screen-1.png               ← gallery images (see naming rules below)
    screen-2.png
    ...
  logistics-app/
    cover.jpg
    screen-1.png
    ...
```

Folder names must match the project `slug` in `content/projects.ts` — that's the link
between everything (it's also the URL: `/projects/<slug>`).

## Workflow

1. Fill in `notes.md` for a project (copy `_template.md` if the folder doesn't exist yet).
   Rough bullets are fine — it's source material, not published copy.
2. Drop exported images into `public/projects/<slug>/`.
   From Figma: select frame → Export → 2x PNG. Compress at https://squoosh.app if large.
3. Ask Claude: *"Build the real case study for `<slug>` from its notes and images."*
   Claude reads `notes.md` and rewrites the placeholder copy in `content/projects.ts`.

## Images wire themselves up — no code edits needed

The site scans `public/projects/<slug>/` at build time (see `lib/project-images.ts`)
and fills each case study's galleries. The rules, in priority order:

1. **`cover.*`** (jpg/png/webp) → the card + case-study hero image. Overwrite to replace
   a generated cover with a real one.
2. A gallery with **explicit `images`** in `content/projects.ts` uses exactly those
   (used for online-classroom's precise mind-map / IA / screens mapping).
3. A gallery with a **`match` prefix** pulls files whose name starts with it —
   e.g. Wireframes (`match: "wireframe"`) shows `wireframe-1.png`, `wireframe-2.png`, …
4. **Otherwise**, if a project has a **single** gallery, it grabs **every non-cover image**
   in the folder — so you can drop `screen-1.png`, `screen-2.png`, … and they just appear.

Images are natural-sorted by filename (`-1`, `-2`, `-10`), so number them to control order.
In dev, refresh after dropping files; on the live site, commit + push (they're baked in at build).

### Naming cheat-sheet — what to drop per project

**Single gallery → drop any images (any name except `cover.*`), numbered for order:**

| slug                  | gallery         | just name them   |
| --------------------- | --------------- | ---------------- |
| `logistics-app`       | Design Screens  | `screen-1.png` … |
| `stock-market-app`    | Visual Designs  | `screen-1.png` … |
| `product-icon-suite`, `glyph-line-icon-library` | The Set / Library | any `*.png` |
| `character-illustrations`, `digital-paintings`  | Gallery           | any `*.png` |
| `ping-pong-game`      | The Prototype   | any `*.png`      |
| `micro-interaction-experiments` | The Experiments | any `*.png` |

**Multiple galleries → name files by the section's prefix:**

| slug                          | gallery → filename prefix                                  |
| ----------------------------- | ---------------------------------------------------------- |
| `forecasting-in-pharma`       | Paper Sketches `sketch-*` · Wireframes `wireframe-*` · Design Screens `screen-*` |
| `mobile-survey-admin-system`  | Wireframes `wireframe-*` · Visual Designs `visual-*` · Mobile Designs `mobile-*` |
| `online-classroom`            | explicit mapping in `projects.ts` — edit there to change   |

The exact prefix for each section is also shown in that section's placeholder text on the
page until you add images, so you never have to remember it.

## Current status

| slug                       | notes.md       | images                        |
| -------------------------- | -------------- | ----------------------------- |
| online-classroom           | ✅ real content | ✅ 7 real screens + cover      |
| logistics-app              | ✅ real content | 🟡 1 real screen + cover       |
| stock-market-app           | ✅ real content | 🎨 generated cover only        |
| forecasting-in-pharma      | ✅ real content | 🎨 generated cover only        |
| mobile-survey-admin-system | ✅ real content | 🎨 generated cover only        |
| ping-pong-game             | ✅ real content | 🎨 gradient cover (no file yet) |
| icon / art projects        | ⬜ light copy   | 🎨 generated cover only        |

Case-study **copy** for the web/mobile projects and Ping-Pong now reflects the real Figma
content. What's left is mostly **real images** — drop them in per the cheat-sheet above.
