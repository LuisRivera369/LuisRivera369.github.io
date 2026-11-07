"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src: string;
  alt: string;
  initial: string;
  className?: string;
}

export function ProfileImage({ src, alt, initial, className }: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);

  return (

    <div
      className={cn(
        "relative overflow-hidden rounded-full border-4 border-primary/30",
        "h-48 w-48 md:h-64 md:w-64",
        className,
      )}
    >
      {hasError ? (
        <div className="flex h-full w-full items-center justify-center bg-base-200 text-5xl font-bold text-primary/50">
          {initial}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 192px, 256px"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
