"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react";

/* ── Types ── */
type Theme = "dark" | "light";

interface ThemeContextValue {
  /** Current theme. */
  theme: Theme;
  /** Convenience boolean for conditional logic. */
  isDark: boolean;
  /** Toggle between dark and light. */
  toggle: () => void;
  /** Set a specific theme. */
  setTheme: (theme: Theme) => void;
}

/* ── Context ── */
const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ── External store (DOM data-theme attribute) ── */

/**
 * Minimal pub/sub so that `useSyncExternalStore` can observe DOM changes
 * and notify React to re-render without a `useEffect`.
 */
const themeListeners = new Set<() => void>();

function subscribeToThemeChanges(callback: () => void) {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
}

function getThemeSnapshot(): Theme {
  return (
    document.documentElement.getAttribute("data-theme") ?? "dark"
  ) as Theme;
}

/* ── Provider ── */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Reads the current theme from the DOM — which was ALREADY set to the
 * correct value by the blocking inline `<ThemeScript />` before the
 * first paint — and exposes it via React context.
 *
 * ## Why this pattern?
 *
 * - No `useEffect` needed.  `useSyncExternalStore` reads the DOM during
 *   hydration, so there is zero delay before React knows the correct
 *   theme.  Combined with the inline blocker script, there is NEVER a
 *   flash of wrong theme.
 * - `setTheme` writes to both `data-theme` (immediate CSS update) and
 *   `localStorage` (persistence), then notifies listeners so React
 *   re-renders with the new value.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot,
    () => "dark" as Theme,
  );

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    /* Notify React that the external store changed */
    themeListeners.forEach((listener) => listener());
  }, []);

  const toggle = useCallback(() => {
    const next = getThemeSnapshot() === "dark" ? "light" : "dark";
    setTheme(next);
  }, [setTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === "dark", toggle, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* ── Hook ── */

/**
 * Access the current theme context.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggle, isDark } = useTheme();
 *   return <button onClick={toggle}>{theme}</button>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}
