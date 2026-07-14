import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/content/projects";

const IMAGE_RE = /\.(png|jpe?g|webp|avif)$/i;
const COVER_RE = /^cover\./i;

/**
 * Finds the cover image for a project on disk at build time.
 * Drop a `cover.*` (jpg/png/webp) into public/projects/<slug>/ and it's picked up.
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

/** All non-cover images in a project's folder, natural-sorted by filename. */
export function getProjectImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_RE.test(f) && !COVER_RE.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/projects/${slug}/${f}`);
  } catch {
    return [];
  }
}

/** Merge the cover found on disk into a project; an explicit `cover` in projects.ts wins. */
export function withImages(project: Project): Project {
  return { ...project, cover: project.cover ?? getProjectCover(project.slug) };
}

const baseName = (p: string) => p.split("/").pop() ?? p;

/**
 * Resolves a project for rendering: sets the cover and fills each gallery's
 * images from disk. A gallery uses (in order): its explicit `images`, else files
 * matching its `match` filename prefix, else — if it's the only auto gallery —
 * all non-cover images. So dropping images into public/projects/<slug>/ just works.
 */
export function hydrateProject(project: Project): Project {
  const cover = project.cover ?? getProjectCover(project.slug);
  const detected = getProjectImages(project.slug);

  const galleries = project.blocks?.filter((b) => b.type === "gallery") ?? [];
  // galleries that will auto-detect (no explicit images): if there's exactly one,
  // it can safely claim every loose image; if several, each needs a `match` prefix.
  const autoGalleries = galleries.filter((b) => b.type === "gallery" && !b.images?.length);
  const soleAutoGallery = autoGalleries.length === 1;

  const blocks = project.blocks?.map((b) => {
    if (b.type !== "gallery" || b.images?.length) return b;
    let imgs: string[];
    if (b.match) {
      const m = b.match.toLowerCase();
      imgs = detected.filter((p) => baseName(p).toLowerCase().startsWith(m));
    } else if (soleAutoGallery) {
      imgs = detected;
    } else {
      imgs = [];
    }
    return imgs.length ? { ...b, images: imgs } : b;
  });

  return { ...project, cover, blocks };
}
