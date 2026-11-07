import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/section-title";

interface SectionShellProps {
  id: string;
  title: string;
  subtitle?: string;
  variant?: "default" | "alt";
  children: React.ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  title,
  subtitle,
  variant = "default",
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 px-4 py-20",
        variant === "alt" ? "bg-base-200" : "bg-base-100",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}
