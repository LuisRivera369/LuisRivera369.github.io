"use client";

import { cn } from "@/lib/utils";

interface CategoryTabsProps<T extends string> {
  categories: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}

export function CategoryTabs<T extends string>({
  categories,
  active,
  onChange,
  className,
}: CategoryTabsProps<T>) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "btn btn-sm transition-colors",
            active === cat.id
              ? "btn-primary"
              : "bg-base-300 hover:bg-base-300 border-none text-base-content",
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
