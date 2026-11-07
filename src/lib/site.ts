import type { Locale } from "@/i18n/routing";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/**
 * Origin without any path. Used for `metadataBase`, whose relative URLs are
 * resolved against the origin and then get `basePath` applied explicitly.
 */
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://luisrivera.dev"
).replace(/\/+$/, "");

/**
 * GitHub Pages project sites live under `/<repo>`. CI sets this through
 * `NEXT_PUBLIC_BASE_PATH`; custom domains and local development leave it empty.
 */
export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

/** Canonical site root, including `basePath` when present. */
export const siteUrl = `${siteOrigin}${basePath}`;

/**
 * Prefixes a public asset with `basePath`.
 *
 * `next/image` with `unoptimized` (required by static export) returns `src`
 * untouched, so `/imagenes/luis.jpg` would resolve to the domain root instead
 * of `/<repo>/imagenes/luis.jpg`.
 */
export function assetPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (basePath && (path === basePath || path.startsWith(`${basePath}/`))) {
    return path;
  }
  return `${basePath}${path}`;
}

/** Absolute URL for a public asset (JSON-LD, `openGraph.images`, ...). */
export function assetUrl(path: string): string {
  return `${siteOrigin}${assetPath(path)}`;
}

/**
 * Maps a locale-agnostic path to its localized URL path.
 *
 * Every route is prefixed and ends with a slash because the export emits
 * `<route>/index.html` and the site is served by static hosts.
 *
 * `localizedPath("en", "/")` → `/en/`
 * `localizedPath("es", "/")` → `/es/`
 * `localizedPath("es", "/projects/taskuy")` → `/es/projects/taskuy/`
 *
 * The result never includes `basePath`: Next's `Link`, router and
 * `redirect` already add it.
 */
export function localizedPath(locale: Locale, path = "/"): string {
  const normalized =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const prefixed = `/${locale}${normalized}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

export function localizedUrl(locale: Locale, path = "/"): string {
  return `${siteUrl}${localizedPath(locale, path)}`;
}

/** `hreflang` map for every supported locale plus `x-default`. */
export function languageAlternates(path = "/") {
  return {
    en: localizedUrl("en", path),
    es: localizedUrl("es", path),
    "x-default": localizedUrl("en", path),
  };
}
