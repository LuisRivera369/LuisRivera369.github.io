"use client";

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

interface UsePaginatedFilteredReturn<T> {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  filteredItems: T[];
  paginatedItems: T[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isEmpty: boolean;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

type Breakpoint = "mobile" | "tablet" | "desktop";

const MOBILE_QUERY = "(max-width: 639px)";
const TABLET_QUERY = "(min-width: 640px) and (max-width: 1023px)";

/** One row per breakpoint, matching the grid columns used by the sections. */
const ITEMS_PER_BREAKPOINT: Record<Breakpoint, number> = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

function getBreakpoint(): Breakpoint {
  if (window.matchMedia(MOBILE_QUERY).matches) return "mobile";
  if (window.matchMedia(TABLET_QUERY).matches) return "tablet";
  return "desktop";
}

/**
 * Subscribes to the two breakpoint media queries instead of `resize`.
 * Media query listeners only fire when the breakpoint actually changes,
 * so no debounce is needed.
 */
function subscribeToBreakpoint(onChange: () => void) {
  const queries = [MOBILE_QUERY, TABLET_QUERY].map((query) =>
    window.matchMedia(query),
  );
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () =>
    queries.forEach((query) => query.removeEventListener("change", onChange));
}

function useBreakpoint() {
  return useSyncExternalStore(
    subscribeToBreakpoint,
    getBreakpoint,
    () => "desktop" as Breakpoint,
  );
}

/**
 * Generic hook for filter + pagination with scroll-jump fix.
 *
 * Scroll-jump fix:
 * 1. Before state change, captures grid wrapper offsetHeight
 * 2. After commit (useLayoutEffect), forces inline `style.height` to previous value
 * 3. On next animation frame, clears the forced height → CSS transition
 */
export function usePaginatedFiltered<T extends { category?: string }>(
  items: readonly T[],
  itemsPerPage: number = 6,
  filterField: keyof T = "category" as keyof T,
  isResponsive: boolean = false,
): UsePaginatedFilteredReturn<T> {
  const [activeFilter, setActiveFilterState] = useState<string>("all");
  const [currentPage, setCurrentPageState] = useState(1);
  const breakpoint = useBreakpoint();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const snapshotRef = useRef(0);

  const pageSize = isResponsive
    ? ITEMS_PER_BREAKPOINT[breakpoint]
    : itemsPerPage;

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return [...items];
    return items.filter((item) => {
      const val = item[filterField];
      return val !== undefined && String(val) === activeFilter;
    });
  }, [items, activeFilter, filterField]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  // Clamp current page when filter or breakpoint reduces total pages
  const safePage = Math.min(currentPage, totalPages);
  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, safePage, pageSize]);

  // Scroll-jump fix: freeze height after DOM commit, release on next paint
  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    if (snapshotRef.current > 0) {
      // Lock height to pre-change value to prevent layout jump
      el.style.height = `${snapshotRef.current}px`;
      el.style.transition = "none";
      el.style.overflow = "hidden";

      // Release on next paint
      requestAnimationFrame(() => {
        el.style.height = "";
        el.style.transition = "";
        el.style.overflow = "";
      });

      snapshotRef.current = 0;
    }
  }, [filteredItems, safePage, pageSize]);

  const setActiveFilter = useCallback((id: string) => {
    if (gridRef.current) {
      snapshotRef.current = gridRef.current.offsetHeight;
    }
    setActiveFilterState(id);
    setCurrentPageState(1);
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    if (gridRef.current) {
      snapshotRef.current = gridRef.current.offsetHeight;
    }
    setCurrentPageState(page);
  }, []);

  return {
    activeFilter,
    setActiveFilter,
    filteredItems,
    paginatedItems,
    currentPage: safePage,
    setCurrentPage,
    totalPages,
    isEmpty: filteredItems.length === 0,
    gridRef,
  };
}
