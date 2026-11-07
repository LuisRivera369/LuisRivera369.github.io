import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * GitHub Pages project sites are served from `https://<user>.github.io/<repo>`,
 * so every URL needs that prefix. CI injects it through
 * `NEXT_PUBLIC_BASE_PATH`; local development and custom domains leave it empty.
 */
function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  devIndicators: false,
  // Fully static output: deployable to GitHub Pages or any static host.
  output: "export",
  // Emits `<route>/index.html`, which static hosts resolve without rewrites.
  trailingSlash: true,
  // The export has no image optimization server, so serve files as-is.
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  experimental: {
    // The root layout lives under `app/[locale]/`, so Next cannot build a
    // 404 document from it. This renders `app/global-not-found.tsx` instead.
    globalNotFound: true,
  },
};

// `public/index.html` handles `/` in the static export, but `next dev` does not
// use it as a directory index. Register the redirect only in development so the
// production export stays warning-free and host-agnostic.
if (process.env.NODE_ENV === "development") {
  nextConfig.redirects = async () => [
    { source: "/", destination: "/en/", permanent: false },
  ];
}

export default withNextIntl(nextConfig);
