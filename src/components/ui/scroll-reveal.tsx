"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  direction?: "up" | "left" | "right";
}

const directionValues: Record<string, string> = {
  up: "translateY(1rem)",
  left: "translateX(-1rem)",
  right: "translateX(1rem)",
};

/**
 * Client component that watches viewport intersection and toggles
 * `data-visible` on the wrapper for CSS fade-in animation.
 * One-shot: once visible, never replays.
 */
export function ScrollReveal({
  children,
  className,
  threshold = 0.1,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (hasBeenVisible.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          hasBeenVisible.current = true;
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-visible={false}
      className={cn("scroll-reveal", className)}
      style={
        {
          "--reveal-transform": directionValues[direction],
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
