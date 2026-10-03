import { createContext, type ReactNode, useContext, useEffect } from "react";

const LocaleContext = createContext("en");

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dataset.locale = "en";
  }, []);
  return <LocaleContext.Provider value="en">{children}</LocaleContext.Provider>;
}

export function useLanguage() {
  return { locale: useContext(LocaleContext) };
}

export function LocalizedTree({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
