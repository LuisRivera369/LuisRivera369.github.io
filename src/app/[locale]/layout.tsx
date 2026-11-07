import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeScript } from "@/lib/theme-script";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { routing, type Locale } from "@/i18n/routing";
import { profile } from "@/data/profile";
import {
  assetPath,
  languageAlternates,
  localizedUrl,
  siteOrigin,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Only the locales declared in `routing` are valid. With static export this
// also tells Next to emit exactly those documents and 404 everything else.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = localizedUrl(locale as Locale, "/");

  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: t("title"),
      template: `%s | ${profile.name}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: profile.name, url: profile.social.github }],
    creator: profile.name,
    alternates: {
      canonical: url,
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      url,
      siteName: profile.name,
      locale: locale === "es" ? "es_PE" : "en_US",
      title: t("title"),
      description: t("description"),
      images: [{ url: assetPath(profile.photo), alt: profile.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [assetPath(profile.photo)],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts this segment into static rendering — required because the locale
  // now comes from the URL instead of a cookie.
  setRequestLocale(locale);

  // ── suppressHydrationWarning ──
  // The blocking <script> in <body> (ThemeScript) changes data-theme
  // before React hydrates, so the server-rendered value ("dark") will
  // differ from the client value (whatever localStorage had). This is
  // intentional — suppressing the warning avoids a spurious mismatch
  // while ThemeScript + ThemeProvider keep the visual state correct.
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          Blocking theme bootstrap. It is the first child of <body>, so the
          parser runs it before rendering the page (see lib/theme-script.tsx).
        */}
        <ThemeScript />
        <NextIntlClientProvider>
          <ThemeProvider>
            {/*
              The header lives in the layout, above `template.tsx`, so it
              persists between routes and never fades with the page.
            */}
            <Navbar />
            <MobileMenu />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
