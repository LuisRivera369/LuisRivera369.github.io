import { getTranslations } from "next-intl/server";
import { SocialLinks } from "@/components/ui/social-links";
import { getProfile } from "@/data/profile";

export default async function FooterSection() {
  const t = await getTranslations("footer");
  const profile = getProfile();
  /* const year = new Date().getFullYear(); */

  return (
    <footer className="bg-base-300 px-4 py-8 text-center">
      <div className="mx-auto max-w-6xl">
        {/* Social Links */}
        <SocialLinks className="mb-4" />

        {/* Copyright */}
        <p className="text-sm text-base-content/70">
          {/* {t("copyrightPrefix", { year })} */}
          {t("copyrightPrefix")}
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            @Luis Rivera
          </a>
        </p>
      </div>
    </footer>
  );
}
