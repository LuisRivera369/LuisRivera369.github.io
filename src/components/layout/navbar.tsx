"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useNavStore, NAV_ITEMS } from "@/stores/nav-store";

export function Navbar() {
  const t = useTranslations("nav.links");
  const tNav = useTranslations("nav");
  const toggleMenu = useNavStore((s) => s.toggleMenu);
  const activeSection = useNavStore((s) => s.activeSection);
  const scrollToSection = useNavStore((s) => s.scrollToSection);

  return (
    <header className="fixed top-0 left-0 z-40 w-full">
      {/* `transition-colors`, not `transition-all`: animating a layer that also
          owns a `backdrop-filter` makes Chrome re-rasterise the blur while the
          content underneath moves, which flickers. */}
      <nav className="navbar h-16 bg-base-100/80 backdrop-blur-md border-b border-base-content/5 px-6 md:px-12 transition-colors">
        <div className="w-full max-w-7xl mx-auto flex items-center">

          <div className="flex-1">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={cn(
                    "relative text-[15px] font-bold tracking-tight transition-colors py-1 group whitespace-nowrap",
                    isActive
                      ? "text-primary"
                      : "text-base-content/60 hover:text-base-content",
                  )}
                >
                  {t(item.id)}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-[width,opacity] duration-300 ease-out",
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full opacity-50 group-hover:opacity-100",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex-1 justify-end flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <LocaleSwitcher />
              <div className="w-px h-4 bg-base-content/10" />
            </div>
            <ThemeToggle />

            <button
              onClick={toggleMenu}
              className="btn btn-ghost btn-sm btn-square md:hidden hover:bg-transparent"
              aria-label={tNav("openMenu")}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
