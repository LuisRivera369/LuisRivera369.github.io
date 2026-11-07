"use client";

import { useSyncExternalStore } from "react";

const THEME_INIT = `
  (function () {
    try {
      var theme = localStorage.getItem("theme");
      if (theme === "light" || theme === "dark") {
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch (e) {}
  })();
`;

/**
 * Hydration gate without `useEffect`.
 *
 * `useSyncExternalStore` returns `false` while React is hydrating (server
 * snapshot) and `true` afterwards (client snapshot). This is the same
 * pattern used by `ThemeToggle` and avoids an effect just to know whether
 * the browser has taken over.
 */
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Inline bootstrap that applies the persisted theme before first paint.
 *
 * The script is the first child of `<body>`, so the HTML parser executes it
 * before rendering the rest of the document. It is intentionally a plain
 * `<script>`: `next/script` with `beforeInteractive` is only guaranteed to
 * run before hydration, and in this app it was emitted after the document
 * head, which allowed a flash of the wrong theme.
 *
 * `ThemeScript` lives in `app/[locale]/layout.tsx`. Because `[locale]` is
 * the root dynamic segment, changing the language (e.g. `/en` → `/es`)
 * remounts the whole layout subtree on the client. React 19 never executes
 * scripts rendered during client-side renders and logs:
 *
 *   "Encountered a script tag while rendering React component..."
 *
 * The script is only useful for the initial document parse (before first
 * paint). Once hydrated, this component returns `null`, so later client-side
 * remounts do not emit an inert `<script>`.
 *
 * It only needs to run on a full page load. Client-side locale switches keep
 * the same `<html>` element, and `ThemeProvider` already reads the attribute.
 */
export function ThemeScript() {
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (hydrated) {
    return null;
  }

  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />;
}
