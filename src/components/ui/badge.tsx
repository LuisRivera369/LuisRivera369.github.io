import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "accent" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
  primary: "text-primary bg-primary/5 border-primary/20",
  secondary: "badge text-primary badge-secondary",
  accent: "badge text-primary badge-accent",
  neutral: "badge text-primary badge-neutral",
};

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span className={cn("badge", variantMap[variant], className)}>
      {children}
    </span>
  );
}
