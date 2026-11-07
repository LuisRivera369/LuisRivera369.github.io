import Image from "next/image";
import { ExternalLink, Code2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import type { ProjectCardData } from "@/types/content";

interface ProjectCardProps {
  project: ProjectCardData;
  locale: Locale;
  className?: string;
  style?: React.CSSProperties;
}

export function ProjectCard({
  project,
  locale,
  className,
  style,
}: ProjectCardProps) {
  const t = useTranslations("projects.detail");
  const title = project.title[locale];
  const href = `/projects/${project.slug}`;

  return (
    <article
      className={cn(
        "card bg-base-300/20 border border-base-content/10 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
      style={style}
    >
      <figure className="relative h-48 overflow-hidden rounded-t-box">
        <Link
          href={href}
          aria-label={t("viewProjectAria", { title })}
          className="group relative block h-full w-full"
        >
          <Image
            src={assetPath(project.image)}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </figure>

      <div className="card-body">
        {/* Title + Action Buttons */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="card-title text-lg text-base-content line-clamp-2"
            title={title}
          >
            <Link href={href} className="hover:text-primary transition-colors">
              {title}
            </Link>
          </h3>

          <div className="flex shrink-0 gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm text-primary hover:bg-base-300"
                aria-label={t("sourceCodeAria", { title })}
              >
                <Code2 size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm text-primary hover:bg-base-300"
                aria-label={t("liveDemoAria", { title })}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        <p
          className="text-sm text-base-content/70 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden"
          title={project.summary[locale]}
        >
          {project.summary[locale]}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="primary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Link
          href={href}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
        >
          {t("viewProject")}
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
