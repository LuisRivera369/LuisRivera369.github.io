/**
 * `template.tsx` re-mounts on every navigation inside `[locale]`, which is
 * exactly what the App Router lacks: a page transition. The wrapper only
 * animates `opacity` (never `transform`) so `position: fixed` descendants
 * keep working, and the header lives in the layout so it stays put while
 * the content fades in.
 *
 * The animation is defined in `globals.css` (`.page-enter`) so it runs on
 * mount without shipping any extra JavaScript.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-enter">{children}</div>;
}
