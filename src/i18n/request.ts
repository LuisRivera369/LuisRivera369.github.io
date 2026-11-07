import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Resolves the active locale from the URL segment instead of a cookie.
 * Reading the locale from `requestLocale` (the `[locale]` param) keeps
 * routes prerenderable — no `cookies()` call means no forced dynamic
 * rendering.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
