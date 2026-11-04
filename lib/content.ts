import { projects } from "@/data/projects";
import type { Project } from "@/types/content";

const MAX_FEATURED = 3;

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured).slice(0, MAX_FEATURED);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
