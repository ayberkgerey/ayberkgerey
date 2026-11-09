import type { StaticImageData } from "next/image";

/**
 * Inline text in blocks supports `backtick` spans, rendered as inline code.
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; language?: string; caption?: string }
  | { type: "table"; columns: string[]; rows: string[][]; caption?: string };

export type ImageAsset = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export type TechStackItem = {
  name: string;
  purpose: string;
};

export type ProjectSectionId =
  | "overview"
  | "problem"
  | "architecture"
  | "implementation"
  | "decisions"
  | "testing"
  | "security"
  | "lessons"
  | "future";

export type Project = {
  slug: string;
  title: string;
  /** One or two sentences, shown on cards and as the page description. */
  summary: string;
  /** Short mono label such as "Case study" or "Learning log". */
  kind: string;
  tags: string[];
  featured?: boolean;
  /** Shown on the project card when present. */
  coverImage?: ImageAsset;
  diagram?: ImageAsset;
  stack?: TechStackItem[];
  repositoryUrl?: string;
  videoUrl?: string;
  sections: Partial<Record<ProjectSectionId, ContentBlock[]>>;
};

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  employmentType: string;
  period: string;
  location: string;
  website?: string;
  highlights?: string[];
  skills?: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};
