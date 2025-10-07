import { type ReactNode, useEffect, useState } from "react";
import { ETheme } from "@/types.ts";
import ThemeProviderContext from "@/context/theme-context";
import { THEME_KEY } from "@/constants.ts";

interface IThemeProviderProps {
  children: ReactNode,
  defaultTheme?: ETheme,
  storageKey?: string,
}

export function ThemeProvider({
  children,
  defaultTheme = ETheme.System,
  storageKey = THEME_KEY,
}: IThemeProviderProps) {
  const [theme, setTheme] = useState<ETheme>(
    () => (localStorage.getItem(storageKey) as ETheme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(ETheme.Light, ETheme.Dark);

    if (theme === ETheme.System) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? ETheme.Dark
        : ETheme.Light;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{
      theme,
      toggleTheme: () => {
        localStorage.setItem(storageKey, theme === ETheme.Light ? ETheme.Dark : ETheme.Light);
        setTheme(theme => theme === ETheme.Light ? ETheme.Dark : ETheme.Light);
      },
    }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}