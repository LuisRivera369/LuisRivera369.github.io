"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel }: ThemeToggleProps) {
  const { isDark, toggle } = useTheme();

  /*
   * Detect whether we're on the client (hydrated) vs server (SSR) without
   * using an effect.  `useSyncExternalStore` is the idiomatic React 19 way
   * to get different snapshots on server vs client.
   *
   * The THEME itself is already correct (set by the inline blocking script
   * in <head>), so there's NO flash — only the icon skips its first paint.
   */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div
        className={cn(
          showLabel ? "btn btn-ghost gap-2" : "btn btn-circle btn-ghost",
          className,
        )}
      />
    );
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        showLabel ? "btn btn-ghost gap-2" : "btn btn-circle btn-ghost",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
      {showLabel && <span>{isDark ? "Dark" : "Light"}</span>}
    </button>
  );
}
