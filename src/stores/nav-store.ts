import { create } from "zustand";
import { smoothScrollToElement, NAVBAR_OFFSET } from "@/lib/smooth-scroll";

export interface NavItem {
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "hero" },
  { id: "projects" },
  { id: "courses" },
  { id: "skills" },
];

interface NavState {
  isMenuOpen: boolean;
  activeSection: string;
  /** True while a navbar click is animating the page to a section. */
  isProgrammaticScroll: boolean;
}

interface NavActions {
  toggleMenu: () => void;
  closeMenu: () => void;
  openMenu: () => void;
  setActiveSection: (id: string) => void;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const useNavStore = create<NavState & NavActions>((set, get) => ({
  isMenuOpen: false,
  activeSection: "",
  isProgrammaticScroll: false,

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  openMenu: () => set({ isMenuOpen: true }),
  setActiveSection: (id) => set({ activeSection: id }),

  scrollToSection: (e, id) => {
    const element = document.getElementById(id);
    const wasMenuOpen = get().isMenuOpen;

    // Close the overlay even when the section isn't on this page, so it
    // doesn't stay open after the navigation to the home page.
    if (wasMenuOpen) get().closeMenu();

    // Not on the home page (e.g. a project detail page): let the browser
    // follow `href="/#id"` so the user lands on the section.
    if (!element) {
      set({ activeSection: id });
      return;
    }

    e.preventDefault();

    // Highlight the destination immediately and freeze the IntersectionObserver
    // until the animation settles, so the indicator doesn't bounce through the
    // sections it passes on the way.
    set({ activeSection: id, isProgrammaticScroll: true });

    const scroll = () => {
      smoothScrollToElement(element, NAVBAR_OFFSET, {
        onComplete: (reached) => {
          set({ isProgrammaticScroll: false });
          // Update the URL once the page has settled. `replaceState` keeps the
          // history clean instead of pushing one entry per section.
          if (reached) window.history.replaceState(null, "", `#${id}`);
        },
      });
    };

    if (wasMenuOpen) {
      // Start on the next frame: React must commit `isMenuOpen: false` (which
      // releases `overflow: hidden`) before the page can move.
      requestAnimationFrame(scroll);
    } else {
      scroll();
    }
  },
}));
