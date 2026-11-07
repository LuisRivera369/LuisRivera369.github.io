"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Link, usePathname } from "@/i18n/navigation";
import { profile } from "@/data/profile";
import { smoothScrollTo } from "@/lib/smooth-scroll";

interface LogoProps {
  variant?: "all" | "icon";
  className?: string;
}

export function Logo({ variant = "all", className }: LogoProps) {
  const pathname = usePathname();
  const showText = variant === "all";

  return (
    <Link
      href="/"
      onClick={(e) => {
        // Already home: smooth-scroll instead of re-navigating.
        if (pathname !== "/") return;
        e.preventDefault();
        smoothScrollTo(0);
        window.history.replaceState(null, "", window.location.pathname);
      }}
      className={cn(
        "flex items-center gap-2.5 font-bold tracking-tight text-xl cursor-pointer select-none group",
        className,
      )}
      aria-label={`${profile.name} — Home`}
    >
      <span className="text-primary transition-transform duration-300 group-hover:scale-110">
        <Icon icon="ant-design:code-outlined" width={24} />
      </span>
      {showText && (
        <span className="text-base-content font-semibold tracking-tight transition-colors duration-300">
          {profile.name}
        </span>
      )}
    </Link>
  );
}
