"use client";

import { useEffect } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useNavStore, NAV_ITEMS } from "@/stores/nav-store";

/**
 * Tracks which section is currently visible and syncs it to the Zustand store.
 * Renders nothing — just a side-effect bridge between the IntersectionObserver
 * hook and the global nav store.
 */
export function ActiveSectionTracker() {
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const setActiveSection = useNavStore((s) => s.setActiveSection);
  const isProgrammaticScroll = useNavStore((s) => s.isProgrammaticScroll);

  useEffect(() => {
    // While a navbar click is animating, keep the clicked target highlighted
    // instead of flashing every section the animation passes through.
    if (isProgrammaticScroll) return;
    setActiveSection(activeSection);
  }, [activeSection, setActiveSection, isProgrammaticScroll]);

  return null;
}
