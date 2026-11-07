import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Path-based locale routing.
 *
 * `always` prefixes every locale, including the default (`/en`, `/es`).
 * Static export cannot run a proxy to rewrite `/` to `/en`, so a fixed
 * prefix per language is required. Each locale then gets its own static
 * document, which is what makes `hreflang` and per-language metadata work.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});
