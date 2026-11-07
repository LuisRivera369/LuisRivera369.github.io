import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getProjectBySlug,
  getProjectSlugs,
  getRelatedProjects,
} from "@/data/projects";
import { assetPath, languageAlternates, localizedUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/ui/project-card";
import { ScrollUp } from "@/components/scroll-up";
import FooterSection from "@/features/footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    const t = await getTranslations({ locale, namespace: "projects.detail" });
    return { title: t("notFound") };
  }

  const loc = locale as Locale;
  const path = `/projects/${project.slug}`;
  const url = localizedUrl(loc, path);
  const title = project.title[loc];
  const description = project.summary[loc];

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      locale: loc === "es" ? "es_PE" : "en_US",
      images: [{ url: assetPath(project.image), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [assetPath(project.image)],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const t = await getTranslations("projects");
  const td = await getTranslations("projects.detail");
  const related = getRelatedProjects(project.slug);
  const title = project.title[loc];

  return (
    <>
      <main className="pt-16">
        <article className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-base-content/60 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              {td("back")}
            </Link>

            <header className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {t(project.category)}
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-base-content/70">
                {project.summary[loc]}
              </p>

              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <dt className="text-base-content/50">{td("role")}:</dt>
                  <dd className="font-semibold">{project.role[loc]}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-base-content/50">{td("year")}:</dt>
                  <dd className="font-semibold">{project.year}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm gap-2"
                  >
                    <ExternalLink size={16} />
                    {td("liveDemo")}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm gap-2"
                  >
                    <Code2 size={16} />
                    {td("sourceCode")}
                  </a>
                )}
              </div>
            </header>

            <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-base-content/10">
              <Image
                src={assetPath(project.image)}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>

            <section className="mt-12">
              <h2 className="text-xl font-bold tracking-tight">
                {td("overview")}
              </h2>
              <p className="mt-4 leading-relaxed text-base-content/80">
                {project.description[loc]}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">
                {td("highlights")}
              </h2>
              <ul className="mt-4 space-y-3">
                {project.highlights[loc].map((item) => (
                  <li key={item} className="flex gap-3 text-base-content/80">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">{td("stack")}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="primary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-base-200 px-4 py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold tracking-tight">
                {td("related")}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ProjectCard
                    key={item.slug}
                    project={item}
                    locale={loc}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <FooterSection />
      <ScrollUp />
    </>
  );
}
