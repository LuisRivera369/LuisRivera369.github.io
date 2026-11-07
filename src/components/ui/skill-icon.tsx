"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface SkillIconProps {
  icon: string;
  label: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SkillIcon({ icon, label, size = 36, className, style }: SkillIconProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn(
      `group flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-5 rounded-2xl cursor-pointer min-w-28 md:min-w-32 max-w-28 md:max-w-32 transition-colors hover:bg-base-300/50 bg-base-300 border border-base-300 shadow-md`,
      className
    )}
    style={style}>
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {hasError ? (
          <span className="text-base-content/40">?</span>
        ) : (
          <Icon
            icon={icon}
            width={size}
            height={size}
            onError={() => setHasError(true)}
          />
        )}
      </div>
      <span className="text-xs text-base-content/70 font-semibold text-center mt-1 line-clamp-1">{label}</span>
    </div>
  );
}
