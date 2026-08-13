/**
 * Single source of truth for the locales the site ships.
 * Add a locale here + a matching dictionaries/<code>.json and every route,
 * the navbar switcher and the hreflang tags pick it up automatically.
 */

export const locales = ['en', 'fr', 'es', 'ru', 'tl'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Short codes shown in the navbar locale switcher. */
export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  es: 'ES',
  ru: 'RU',
  tl: 'TL',
};

/** BCP-47 tags used for Intl date/number formatting. */
const intlLocales: Record<Locale, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
  es: 'es-ES',
  ru: 'ru-RU',
  tl: 'fil-PH',
};

export function intlLocale(lang: string): string {
  return isLocale(lang) ? intlLocales[lang] : intlLocales[defaultLocale];
}

/**
 * Language code sent to the football feed. The provider does not serve
 * Filipino, so those pages fall back to English team/league names.
 */
const apiLangs: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
  es: 'es',
  ru: 'ru',
  tl: 'en',
};

export function apiLang(lang: string): string {
  return isLocale(lang) ? apiLangs[lang] : 'en';
}

/** Builds the hreflang alternates map for a localised path. */
export function languageAlternates(
  path: (locale: Locale) => string
): Record<string, string> {
  return Object.fromEntries(locales.map((locale) => [locale, path(locale)]));
}
