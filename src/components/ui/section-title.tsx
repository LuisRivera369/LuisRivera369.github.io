import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-10 text-center flex flex-col items-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <span className="mt-2 block h-1 w-14 rounded-full bg-primary mx-auto" />
      {subtitle && (
        <p className="mt-3 text-lg text-base-content/70 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
