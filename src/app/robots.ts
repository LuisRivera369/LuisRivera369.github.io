import type { MetadataRoute } from "next";
import { siteOrigin, siteUrl } from "@/lib/site";

// Required by `output: "export"` for route handlers that generate files.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteOrigin,
  };
}
