import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import { hydrateProject } from "@/lib/project-images";
import CaseStudyBody from "@/components/CaseStudyBody";
import SiteHeader from "@/components/SiteHeader";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.title} — Kumaresan Munusamy` : "Project not found",
    description: project?.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Rotate through the catalogue so each project page suggests a different trio.
  const start = projects.findIndex((p) => p.slug === project.slug);
  const moreProjects = Array.from(
    { length: Math.min(3, projects.length - 1) },
    (_, k) => projects[(start + k + 1) % projects.length],
  ).map(hydrateProject);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <CaseStudyBody project={hydrateProject(project)} moreProjects={moreProjects} />
    </main>
  );
}
