import type { Locale } from "./types";
import * as en from "./en";

const dictionaries = { en } as const;

export const defaultLocale: Locale = "en";

/** Returns all content for a locale. Add `tr` here when the Turkish copy exists. */
export function getContent(locale: Locale = defaultLocale) {
  return dictionaries[locale];
}

export * from "./en";
export type * from "./types";
