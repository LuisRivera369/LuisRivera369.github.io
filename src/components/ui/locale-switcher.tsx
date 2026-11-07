"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Languages, ChevronDown, Loader2, Check } from "lucide-react";
import { useEffect, useTransition } from "react";

interface LocaleSwitcherProps {
  className?: string;
}

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const [isPending, startTransition] = useTransition();

  // The new document has painted: fade the content back in and make sure
  // the dimmed state is never left behind.
  useEffect(() => {
    document.documentElement.removeAttribute("data-locale-switching");
  }, [locale]);

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    // Soften the swap: the current content dims while the next locale
    // renders, then the enter transition + this fade reveal it.
    document.documentElement.setAttribute("data-locale-switching", "true");
    window.setTimeout(() => {
      document.documentElement.removeAttribute("data-locale-switching");
    }, 2500);

    // Keep the current path (and any anchor) while swapping the locale
    // prefix. No cookie, no refresh — this is a real navigation.
    // Static exports use `<route>/index.html`, so keep the trailing slash.
    // `scroll: false` keeps the reader where they were instead of
    // snapping to the top of the page.
    const hash = window.location.hash;
    const target = pathname.endsWith("/") ? pathname : `${pathname}/`;
    startTransition(() => {
      router.replace(`${target}${hash}`, {
        locale: nextLocale,
        scroll: false,
      });
    });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className={cn("dropdown dropdown-bottom md:dropdown-end", className)}>
      {/* ── TRIGGER ── */}
      <div
        tabIndex={0}
        role="button"
        aria-label={
          isPending
            ? tLang("switching")
            : `${LOCALE_LABELS[locale]} — ${t("switchLanguage")}`
        }
        aria-disabled={isPending}
        className={cn(
          "btn btn-ghost btn-sm px-2 gap-1 font-medium space-x-1",
          isPending && "pointer-events-none opacity-70",
        )}
      >
        {isPending ? (
          <Loader2
            size={18}
            className="text-primary animate-spin"
            aria-hidden="true"
          />
        ) : (
          <Languages size={18} className="text-primary" />
        )}
        <span className="uppercase text-xs">{locale}</span>
        <ChevronDown size={14} className="text-base-content/40" />
      </div>

      {/* ── DROPDOWN ── */}
      <ul
        tabIndex={0}
        className="dropdown-content z-60 menu p-2 shadow-sm bg-base-100 border border-base-content/15 rounded-sm w-40 mt-2 space-y-1"
      >
        {(Object.keys(LOCALE_LABELS) as Locale[]).map((key) => (
          <li key={key}>
            <button
              onClick={() => switchLocale(key)}
              disabled={isPending}
              lang={key}
              aria-current={locale === key ? "true" : undefined}
              className={cn(
                "flex justify-between items-center px-4 py-2 transition-colors",
                locale === key
                  ? "bg-primary text-primary-content font-bold"
                  : "hover:bg-base-content/10",
                isPending && "opacity-50 pointer-events-none",
              )}
            >
              <span>{LOCALE_LABELS[key]}</span>
              {locale === key && !isPending && (
                <span className="text-xs opacity-70" aria-hidden="true">
                  <Check size={12} strokeWidth={4.0} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
