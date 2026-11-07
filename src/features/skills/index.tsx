"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/layout/section-shell";
import { CategoryTabs } from "@/components/ui/category-tabs";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SkillIcon } from "@/components/ui/skill-icon";
import {
  skillCategoryIds,
  type Skill,
  type SkillCategory,
} from "@/types/content";

export default function SkillsSection({ skills }: { skills: readonly Skill[] }) {
  const t = useTranslations("skills");

  const [activeFilter, setActiveFilter] = useState<SkillCategory>("frontend");

  const filteredSkills = skills.filter((s) => s.category === activeFilter);

  const categories = skillCategoryIds.map((id) => ({
    id,
    label: t(id),
  }));

  return (
    <SectionShell id="skills" title={t("title")} variant="alt">
      <div className="mb-8 flex justify-center">
        <CategoryTabs<SkillCategory>
          categories={categories}
          active={activeFilter}
          onChange={(id) => setActiveFilter(id)}
        />
      </div>

      {filteredSkills.length > 0 ? (
        <ScrollReveal>
          <div
            key={`skills-${activeFilter}`}
            className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto items-start transition-opacity duration-300"
          >
            {filteredSkills.map((skill, index) => (
              <SkillIcon
                key={skill.name}
                icon={skill.icon}
                label={skill.name}
                size={36}
                className="card-enter transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ animationDelay: `${index * 60}ms` }}
              />
            ))}
          </div>
        </ScrollReveal>
      ) : (
        <p className="py-16 text-center text-base-content/60">{t("empty")}</p>
      )}
    </SectionShell>
  );
}
