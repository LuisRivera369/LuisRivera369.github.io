/**
 * Distance-aware, eased scrolling.
 *
 * The native `scroll-behavior: smooth` curve is heavily front-loaded: for a
 * 2.000 px jump it covers ~78% of the distance in the first 300 ms and then
 * crawls for another ~500 ms, which reads as "forced". This helper keeps the
 * same ballpark duration (450–850 ms) but distributes the motion with a
 * symmetric ease-in-out, so it feels gentle at both ends.
 *
 * The animation yields to the user immediately on wheel, touch or scroll keys,
 * and reports completion (or interruption) through `onComplete`.
 */

/** Height of the fixed navbar (`h-16`), used to keep sections visible. */
export const NAVBAR_OFFSET = 64;

const MIN_DURATION = 450;
const MAX_DURATION = 850;
const MS_PER_PX = 0.5;

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

interface SmoothScrollOptions {
  /** Overrides the computed duration, in milliseconds. */
  duration?: number;
  /**
   * Called when the animation stops, either on arrival (`reached: true`) or
   * because the user took over (`reached: false`).
   */
  onComplete?: (reached: boolean) => void;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Only one animation may own the scroll at a time. A second call retargets.
let cancelActive: (() => void) | null = null;

/** Scrolls the window to `targetY` with an eased, interruptible animation.
 * Returns a function that cancels the animation.
 */
export function smoothScrollTo(
  targetY: number,
  { duration, onComplete }: SmoothScrollOptions = {},
): () => void {
  if (typeof window === "undefined") return () => {};

  // Cancel the in-flight animation silently: its onComplete belongs to a
  // scroll that is no longer relevant and must not unlock the new one.
  cancelActive?.();
  cancelActive = null;

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const endY = Math.min(Math.max(0, targetY), maxScroll);
  const startY = window.scrollY;
  const distance = endY - startY;

  // Reduced motion or already there: jump instantly, no fake animation.
  if (distance === 0 || prefersReducedMotion()) {
    window.scrollTo({ top: Math.round(endY), behavior: "instant" });
    onComplete?.(true);
    return () => {};
  }

  const totalDuration =
    duration ??
    Math.min(
      MAX_DURATION,
      Math.max(MIN_DURATION, Math.abs(distance) * MS_PER_PX),
    );

  const start = performance.now();
  let frame = 0;
  let stopped = false;

  function cleanup() {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", onInterrupt);
    window.removeEventListener("touchstart", onInterrupt);
    window.removeEventListener("keydown", onKey);
    if (cancelActive === silentStop) cancelActive = null;
  }

  function stop(reached: boolean) {
    if (stopped) return;
    stopped = true;
    cleanup();
    onComplete?.(reached);
  }

  function silentStop() {
    stopped = true;
    cleanup();
  }

  const onInterrupt = () => stop(false);
  const onKey = (event: KeyboardEvent) => {
    if (SCROLL_KEYS.has(event.key)) stop(false);
  };

  function tick(now: number) {
    if (stopped) return;
    const progress = Math.min(1, (now - start) / totalDuration);
    // `instant` on every frame: mixing this with `smooth` would queue a
    // second native animation behind ours.
    window.scrollTo({
      top: startY + distance * easeInOutCubic(progress),
      behavior: "instant",
    });
    if (progress < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      stop(true);
    }
  }

  window.addEventListener("wheel", onInterrupt, { passive: true });
  window.addEventListener("touchstart", onInterrupt, { passive: true });
  window.addEventListener("keydown", onKey);

  cancelActive = silentStop;
  frame = requestAnimationFrame(tick);

  return () => stop(false);
}

/** Scrolls an element into view, leaving room for the fixed navbar. */
export function smoothScrollToElement(
  element: HTMLElement,
  offset: number = NAVBAR_OFFSET,
  options?: SmoothScrollOptions,
): () => void {
  const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
  return smoothScrollTo(targetY, options);
}
