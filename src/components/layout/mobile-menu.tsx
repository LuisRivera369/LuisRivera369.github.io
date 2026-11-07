"use client";

import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Variants,
} from "framer-motion";
import { X } from "lucide-react";
import { useNavStore, NAV_ITEMS } from "@/stores/nav-store";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect } from "react";

/* ── Animation Variants ── */

const overlayVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
};

const itemVariants: Variants = {
  closed: { y: 20, opacity: 0 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.12 + i * 0.06,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
};

/* ── Component ── */

export function MobileMenu() {
  const t = useTranslations("nav.links");
  const tNav = useTranslations("nav");
  const isMenuOpen = useNavStore((s) => s.isMenuOpen);
  const closeMenu = useNavStore((s) => s.closeMenu);
  const activeSection = useNavStore((s) => s.activeSection);
  const scrollToSection = useNavStore((s) => s.scrollToSection);

  /* Lock body scroll + ESC key listener */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    /* Direct style injection — avoids CSS specificity conflicts with DaisyUI.
       scrollbar-gutter: stable reserves the scrollbar space so content
       doesn't shift left when overflow:hidden kicks in. */
    const html = document.documentElement;
    html.style.overflow = "hidden";
    html.style.scrollbarGutter = "stable";
    window.addEventListener("keydown", handleEsc);

    return () => {
      html.style.overflow = "";
      html.style.scrollbarGutter = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-50 bg-base-100 flex flex-col items-center justify-center p-10 overflow-hidden"
          >
            {/* ── Top bar: locale + theme + close ── */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
              <button
                onClick={closeMenu}
                className="btn btn-ghost btn-circle btn-md opacity-40 hover:opacity-100 transition-opacity"
                aria-label={tNav("closeMenu")}
              >
                <X size={28} />
              </button>
            </div>

            {/* ── Navigation links ── */}
            <div className="w-full max-w-sm">
              <ul className="flex flex-col items-center gap-6">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      custom={i}
                      variants={itemVariants}
                      className="w-full"
                    >
                      <Link
                        href={`/#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={cn(
                          "text-2xl font-medium tracking-tight transition-colors block text-center py-2",
                          isActive
                            ? "text-primary"
                            : "text-base-content/40 hover:text-base-content",
                        )}
                      >
                        {t(item.id)}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
