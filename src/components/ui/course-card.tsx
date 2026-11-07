import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/content";

interface CourseCardProps {
  course: Course;
  locale: Locale;
  className?: string;
  style?: React.CSSProperties;
}

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "es" ? "es-PE" : "en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

export function CourseCard({ course, locale, className, style }: CourseCardProps) {
  const t = useTranslations("courses");
  const title = course.title[locale];

  return (
    <article
      className={cn(
        "card bg-base-300/20 border border-base-content/10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
      style={style}
    >
      <div className="card-body">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {course.badge && (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl p-1.5">
                <Image
                  src={assetPath(course.badge)}
                  alt={course.institution}
                  fill
                  sizes="40px"
                  className="object-contain p-0.5"
                />
              </div>
            )}
            <div>
              <h3 className="card-title text-base text-base-content">{title}</h3>
              <p className="text-sm text-base-content/70">{course.institution}</p>
            </div>
          </div>
        </div>

        <p className="mt-1 text-xs text-base-content/60">
          {formatDate(course.date, locale)}
        </p>

        <div className="card-actions mt-3 items-center justify-between">
          <Badge variant="primary" className="text-xs">
            {t(course.category)}
          </Badge>

          {course.credentialUrl && (
            <a
              href={course.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-xs gap-1 text-primary"
              aria-label={t("credentialAria", { title })}
            >
              <ExternalLink size={14} />
              <span>{t("credential")}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
