import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, getProjectsByCategory } from "@/content/projects";
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

  const siblings = getProjectsByCategory(project.category);
  const index = siblings.findIndex((p) => p.slug === project.slug);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <CaseStudyBody
        project={project}
        prevProject={index > 0 ? siblings[index - 1] : undefined}
        nextProject={index < siblings.length - 1 ? siblings[index + 1] : undefined}
      />
    </main>
  );
}
