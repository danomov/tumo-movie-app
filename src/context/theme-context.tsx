import { createContext } from "react";
import { ETheme } from "@/types.ts";

interface IThemeProviderState {
  theme: ETheme
  toggleTheme: () => void
}

const initialState: IThemeProviderState = {
  theme: ETheme.System,
  toggleTheme: () => {},
};

const ThemeProviderContext = createContext<IThemeProviderState>(initialState);

export default ThemeProviderContext;