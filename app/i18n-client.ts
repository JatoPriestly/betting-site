"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "./i18n";
import en from "../dictionaries/en.json";
import fr from "../dictionaries/fr.json";
import es from "../dictionaries/es.json";
import ru from "../dictionaries/ru.json";
import tl from "../dictionaries/tl.json";

const dictionaries: Record<Locale, typeof en> = { en, fr, es, ru, tl };

/**
 * Locale dictionary for client components mounted above the [lang] segment
 * (the global widgets in the root layout), read from the URL.
 */
export function useDictionary(): typeof en {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] ?? "";
  return dictionaries[isLocale(segment) ? segment : defaultLocale];
}
