import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. `Link`, `redirect` and the router
 * returned here always keep the current locale prefix, so internal links
 * never drop the user back to the default language.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
