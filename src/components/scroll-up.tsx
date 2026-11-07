"use client";

import { ArrowUp } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

interface ScrollUpProps {
  className?: string;
}

export function ScrollUp({ className }: ScrollUpProps) {
  const { isScrolled } = useScroll();

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "btn btn-circle fixed bottom-8 right-8 z-30 transition-all duration-300",
        "border-none bg-primary text-primary-content shadow-lg hover:opacity-90",
        isScrolled
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
