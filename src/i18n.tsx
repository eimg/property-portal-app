import en from "./locales/en.json";
import my from "./locales/my.json";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Locale = "en" | "my";

const translations: Record<Locale, Record<string, string>> = { en, my };

type LanguageContextValue = { locale: Locale; toggleLanguage: () => void };
const LocaleContext = createContext<LanguageContextValue>({
  locale: "en",
  toggleLanguage: () => undefined,
});

function readSavedLocale(): Locale {
  try {
    return localStorage.getItem("property_portal_locale") === "my" ? "my" : "en";
  } catch {
    return "en";
  }
}

function translateText(text: string, locale: Locale) {
  const trimmed = text.trim();
  const translation = translations[locale][trimmed];
  if (!translation) return text;
  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translation}${trailing}`;
}

const translatedAttributes = ["aria-label", "title", "placeholder"] as const;

function localizeNode(node: ReactNode, locale: Locale): ReactNode {
  if (typeof node === "string") return translateText(node, locale);
  if (typeof node === "number" || !isValidElement<{ children?: ReactNode }>(node)) return node;

  const props = node.props as Record<string, unknown> & { children?: ReactNode };
  if (props["data-no-translate"] === true) return node;
  const nextProps: Record<string, unknown> = {};
  for (const attribute of translatedAttributes) {
    const value = props[attribute];
    if (typeof value === "string") nextProps[attribute] = translateText(value, locale);
  }
  if (props.children !== undefined) {
    nextProps.children = Children.map(props.children, (child) => localizeNode(child, locale));
  }
  return cloneElement(node, nextProps);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readSavedLocale);
  const context = useMemo(
    () => ({
      locale,
      toggleLanguage: () => setLocale((current) => (current === "en" ? "my" : "en")),
    }),
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale === "my" ? "my" : "en";
    document.documentElement.dataset.locale = locale;
    try {
      localStorage.setItem("property_portal_locale", locale);
    } catch {
      // Language switching remains usable when storage is unavailable.
    }
  }, [locale]);

  return <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>;
}

export function useLanguage() {
  return useContext(LocaleContext);
}

export function LocalizedTree({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  return <>{Children.map(children, (child) => localizeNode(child, locale))}</>;
}
