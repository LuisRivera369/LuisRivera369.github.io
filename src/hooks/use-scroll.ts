"use client";

import { useState, useEffect } from "react";

export function useScroll(threshold: number = 300) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Coalesce scroll events into one state update per frame. We only keep the
    // boolean, so React bails out when it hasn't changed.
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > threshold);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return { isScrolled };
}
