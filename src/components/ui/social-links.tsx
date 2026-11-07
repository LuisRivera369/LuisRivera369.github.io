"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { getProfile } from "@/data/profile";

interface SocialLinksProps {
  size?: number;
  className?: string;
}

export function SocialLinks({ size = 22, className }: SocialLinksProps) {
  const profile = getProfile();

  return (
    <div className={cn("flex justify-center items-center gap-4", className)}>
      <a
        href={profile.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="link hover:text-primary text-base-content/70"
        aria-label="LinkedIn"
      >
        <Icon icon="tabler:brand-linkedin" width={size} height={size} fontSize={30}/>
        {/* <Icon icon="tabler:brand-linkedin" width={size} height={size} /> */}
      </a>
      <a
        href={profile.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link text-base-content/70 hover:text-primary"
        aria-label="GitHub"
      >
        <Icon icon="tabler:brand-github" width={size} height={size} />
      </a>

      <a
        href={profile.social.email}
        target="_blank"
        rel="noopener noreferrer"
        className="link text-base-content/70 hover:text-primary"
        aria-label="Email"
      >
        <Icon icon="tabler:mail" width={size} height={size} />
      </a>
      <a
        href={profile.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="link text-base-content/70 hover:text-primary"
        aria-label="Whatsapp"
      >
        <Icon
          icon="tabler:brand-whatsapp"
          width={size}
          height={size}
          strokeWidth={1.5}
        />
      </a>
    </div>
  );
}
