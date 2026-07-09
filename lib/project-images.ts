import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/content/projects";

const IMAGE_RE = /\.(png|jpe?g|webp|avif)$/i;
const COVER_RE = /^cover\./i;

/**
 * Scans public/projects/<slug>/ at render time (build time in production).
 * `cover.*` becomes the cover; every other image becomes a gallery screen,
 * sorted naturally by filename — so dropping files in is all it takes.
 */
export function getProjectImages(slug: string): { cover?: string; screens: string[] } {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMAGE_RE.test(f));
  } catch {
    return { screens: [] };
  }
  const coverFile = files.find((f) => COVER_RE.test(f));
  const screens = files
    .filter((f) => !COVER_RE.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/projects/${slug}/${f}`);
  return {
    cover: coverFile ? `/projects/${slug}/${coverFile}` : undefined,
    screens,
  };
}

/** Merge images found on disk into a project; explicit fields in projects.ts win. */
export function withImages(project: Project): Project {
  const found = getProjectImages(project.slug);
  return {
    ...project,
    cover: project.cover ?? found.cover,
    screens: project.screens?.length ? project.screens : found.screens,
  };
}
