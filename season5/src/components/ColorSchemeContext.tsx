import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useReducer } from "react";
import { Appearance } from "react-native";

export type ColorScheme = "light" | "dark";

const defaultValue = Appearance.getColorScheme() ?? "light";

interface ColorSchemeContext {
  colorScheme: ColorScheme;
  dispatch: (scheme: ColorScheme) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContext | null>(null);

const colorSchemeReducer = (_: ColorScheme, colorScheme: ColorScheme) => {
  return colorScheme;
};

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  if (ctx === null) {
    throw new Error("No ColorScheme context context found");
  }
  const { colorScheme, dispatch } = ctx;
  const toggle = useCallback(() => {
    dispatch(colorScheme === "light" ? "dark" : "light");
  }, [colorScheme, dispatch]);
  return { colorScheme, toggle };
};

interface ColorSchemeProviderProps {
  children: ReactNode;
}

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, dispatch] = useReducer(colorSchemeReducer, defaultValue);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, dispatch }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
