import { getTranslations } from "next-intl/server";
import { getProfile } from "@/data/profile";
import { assetPath } from "@/lib/site";
import { SocialLinks } from "@/components/ui/social-links";
import { ProfileImage } from "./profile-image";
import TypedText from "./typed-text";
import { FileText } from "lucide-react";

export default async function HeroSection() {
  const t = await getTranslations("hero");
  const profile = getProfile();

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128,128,128,0.15) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(128,128,128,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:flex-row md:gap-16"
      >
        {/* Subtle gradient backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />

        {/* Profile Photo */}
        <div className="relative z-10">
          <ProfileImage
            src={assetPath(profile.photo)}
            alt={profile.name}
            initial={profile.name[0]}
          />
        </div>

        {/* Text + Actions */}
        <div className="relative z-10 flex max-w-lg flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-base-content md:text-5xl">
            {profile.name}
          </h1>

          <TypedText />
          {/* <p className="mt-2 text-xl font-medium text-primary">{t("subtitle")}</p> */}

          <p className="mt-2 text-base-content/70">{t("description")}</p>

          {/* Buttons + Social */}
          <div className="mt-8 flex flex-col flex-wrap sm:flex-row items-center justify-center gap-5 md:justify-start">
            <a
              href={assetPath(profile.cvUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-primary gap-2 hover:bg-primary/10 hover:text-primary"
              aria-label="View CV"
            >
              <FileText size={18} />
              {t("cta")}
            </a>

            <SocialLinks size={24} />
          </div>
        </div>
      </section>
    </>
  );
}
