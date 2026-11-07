import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { assetPath } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 | Luis Rivera",
  description: "Page not found — Página no encontrada.",
};

/**
 * Global 404 document.
 *
 * The app's root layout lives under `app/[locale]/`, which is a top-level
 * dynamic segment. Next.js cannot compose a 404 document from it, so this
 * file (enabled by `experimental.globalNotFound`) returns a full HTML
 * document instead. It bypasses the layouts, hence the explicit `<html>`,
 * font variables and stylesheet import.
 *
 * The locale is unknown here, so the copy is shown in both languages.
 */
export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-base-100 text-base-content flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          404
        </p>

        <div className="mt-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="max-w-md text-base-content/70">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="mt-8 w-full max-w-md border-t border-base-content/10 pt-8 space-y-2">
          <h2 className="text-xl font-bold tracking-tight" lang="es">
            Página no encontrada
          </h2>
          <p className="max-w-md text-base-content/70" lang="es">
            La página que buscas no existe o fue movida.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            className="btn btn-primary btn-sm"
            href={assetPath("/en/")}
            hrefLang="en"
          >
            Back to home
          </a>
          <a
            className="btn btn-outline btn-sm"
            href={assetPath("/es/")}
            hrefLang="es"
          >
            Volver al inicio
          </a>
        </div>
      </body>
    </html>
  );
}
