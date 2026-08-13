import { defaultLocale, isLocale } from './i18n';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
  tl: () => import('../dictionaries/tl.json').then((module) => module.default),
};

/** Unknown locales fall back to the default dictionary. */
export const getDictionary = async (locale: string) => {
  return dictionaries[isLocale(locale) ? locale : defaultLocale]();
};
