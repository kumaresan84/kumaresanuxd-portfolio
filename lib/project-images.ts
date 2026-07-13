import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/content/projects";

const IMAGE_RE = /\.(png|jpe?g|webp|avif)$/i;
const COVER_RE = /^cover\./i;

/**
 * Finds the cover image for a project on disk at build time.
 * Drop a `cover.*` (jpg/png/webp) into public/projects/<slug>/ and it's picked up.
 * Case-study gallery images are referenced explicitly in each project's blocks.
 */
export function getProjectCover(slug: string): string | undefined {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  try {
    const cover = fs.readdirSync(dir).find((f) => IMAGE_RE.test(f) && COVER_RE.test(f));
    return cover ? `/projects/${slug}/${cover}` : undefined;
  } catch {
    return undefined;
  }
}

/** Merge the cover found on disk into a project; an explicit `cover` in projects.ts wins. */
export function withImages(project: Project): Project {
  return { ...project, cover: project.cover ?? getProjectCover(project.slug) };
}
