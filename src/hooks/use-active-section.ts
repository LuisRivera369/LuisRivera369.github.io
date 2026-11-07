"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track the currently active section in the viewport.
 * @param sectionIds Array of section IDs to track
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");
  // A joined key keeps the effect stable when callers pass a new array
  // literal on every render (which would recreate the observer).
  const sectionKey = sectionIds.join("|");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionKey.split("|").forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionKey]);

  return activeSection;
}
