import type { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";

import { routing } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/site";

// Required by `output: "export"` for route handlers that generate files.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "/",
    ...getProjects().map((project) => `/projects/${project.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
