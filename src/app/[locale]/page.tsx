import { setRequestLocale } from "next-intl/server";
import { ActiveSectionTracker } from "@/components/layout/active-section-tracker";
import HeroSection from "@/features/hero";
import ProjectsSection from "@/features/projects";
import CoursesSection from "@/features/courses";
import SkillsSection from "@/features/skills";
import FooterSection from "@/features/footer";
import { ScrollUp } from "@/components/scroll-up";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { getProjectCards } from "@/data/projects";
import { getCourses } from "@/data/courses";
import { getSkills } from "@/data/skills";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PersonJsonLd locale={locale} />
      <ActiveSectionTracker />
      <main>
        <HeroSection />
        <ProjectsSection projects={getProjectCards()} />
        <CoursesSection courses={getCourses()} />
        <SkillsSection skills={getSkills()} />
      </main>

      <FooterSection />
      <ScrollUp />
    </>
  );
}
