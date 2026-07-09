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
    cover.png                  ← 16:10, ~1600×1000 (card + case-study hero)
    screen-1.png               ← 4:3, ~1200×900 (screens gallery)
    screen-2.png
    ...
  logistics-app/
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
   Claude reads `notes.md`, wires the images (`cover` / `screens` fields), and rewrites
   the placeholder copy in `content/projects.ts`.

## Current status

| slug                       | notes.md          | images |
| -------------------------- | ----------------- | ------ |
| online-classroom           | ✅ real content    | ⬜ none |
| logistics-app              | ⬜ template        | ⬜ none |
| mobile-survey-admin-system | ⬜ template        | ⬜ none |
| forecasting-in-pharma      | ⬜ template        | ⬜ none |
| stock-market-app           | ⬜ template        | ⬜ none |

Icon / Art / Fun projects: same idea — create `content/case-studies/<slug>/notes.md`
and `public/projects/<slug>/` when you're ready to make them real.
