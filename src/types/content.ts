import type { Locale } from "@/i18n/routing";

/** A value translated into every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

// ──────────────────────────────────────────────
// Profile
// ──────────────────────────────────────────────

export interface Profile {
  name: string;
  profession: Localized;
  photo: string;
  cvUrl: string;
  social: {
    linkedin: string;
    github: string;
    email: string;
    whatsapp: string;
  };
}

// ──────────────────────────────────────────────
// Categories — single source of truth for both data and filters
// ──────────────────────────────────────────────

export const projectCategoryIds = ["programming", "data"] as const;
export type ProjectCategory = (typeof projectCategoryIds)[number];
export type ProjectFilter = ProjectCategory | "all";

export const courseCategoryIds = [
  "udemy",
  "cisco",
  "certus",
  "idat",
  "devTalles",
] as const;
export type CourseCategory = (typeof courseCategoryIds)[number];
export type CourseFilter = CourseCategory | "all";

export const skillCategoryIds = [
  "frontend",
  "backend",
  "devTools",
  "dataTools",
] as const;
export type SkillCategory = (typeof skillCategoryIds)[number];

// ──────────────────────────────────────────────
// Content models
// ──────────────────────────────────────────────

/** Short text used by the project cards. */
export interface Project {
  slug: string;
  title: Localized;
  /** One-liner for cards and meta descriptions. */
  summary: Localized;
  /** Long-form copy for the detail page. */
  description: Localized;
  /** Bullet points shown on the detail page. */
  highlights: Localized<string[]>;
  role: Localized;
  year: number;
  image: string;
  tags: readonly string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
}

/**
 * Project fields needed by the cards. Keeps long-form copy (`description`,
 * `highlights`) out of the client payload and the browser bundle.
 */
export type ProjectCardData = Pick<
  Project,
  | "slug"
  | "title"
  | "summary"
  | "image"
  | "tags"
  | "category"
  | "githubUrl"
  | "liveUrl"
>;

export interface Course {
  id: string;
  title: Localized;
  institution: string;
  badge: string;
  /** ISO date (`YYYY-MM-DD`). */
  date: string;
  credentialUrl?: string;
  category: CourseCategory;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}
