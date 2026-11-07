"use client";

import { useLocale, useTranslations } from "next-intl";
import { SectionShell } from "@/components/layout/section-shell";
import { CategoryTabs } from "@/components/ui/category-tabs";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ProjectCard } from "@/components/ui/project-card";
import { usePaginatedFiltered } from "@/hooks/use-paginated-filtered";
import {
  projectCategoryIds,
  type ProjectCardData,
  type ProjectFilter,
} from "@/types/content";
import type { Locale } from "@/i18n/routing";

const ITEMS_PER_PAGE = 4;

export default function ProjectsSection({
  projects,
}: {
  projects: readonly ProjectCardData[];
}) {
  const t = useTranslations("projects");
  const locale = useLocale() as Locale;

  const {
    activeFilter,
    setActiveFilter,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    isEmpty,
    gridRef,
  } = usePaginatedFiltered(projects, ITEMS_PER_PAGE, "category", true);

  const categories: { id: ProjectFilter; label: string }[] = [
    { id: "all", label: t("all") },
    ...projectCategoryIds.map((id) => ({ id, label: t(id) })),
  ];

  return (
    <SectionShell id="projects" title={t("title")} variant="alt">
      <div className="mb-8">
        <CategoryTabs<ProjectFilter>
          categories={categories}
          active={activeFilter as ProjectFilter}
          onChange={(id) => setActiveFilter(id)}
        />
      </div>

      {isEmpty ? (
        <p className="py-16 text-center text-base-content/60">{t("empty")}</p>
      ) : (
        <div ref={gridRef}>
          <ScrollReveal>
            <div
              key={`page-${activeFilter}-${currentPage}`}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedItems.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  className="card-enter"
                  style={{ animationDelay: `${index * 80}ms` }}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      )}

      {!isEmpty && (
        <div className="mt-8 flex justify-center">
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </SectionShell>
  );
}
