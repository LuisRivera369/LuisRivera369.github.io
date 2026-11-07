import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/routing";
import { assetUrl, localizedUrl } from "@/lib/site";

export function PersonJsonLd({ locale }: { locale: string }) {
  const loc: Locale = locale === "es" ? "es" : "en";

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.profession[loc],
    url: localizedUrl(loc, "/"),
    image: assetUrl(profile.photo),
    email: profile.social.email.replace("mailto:", ""),
    sameAs: [profile.social.linkedin, profile.social.github],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "SQL",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
