import { createBox, createText, createTheme } from "@shopify/restyle";

import type { ColorScheme } from "./ColorSchemeContext";

const palette = {
  black: "#0B0B0B",
  white: "#F0F2F3",
};

export const theme = createTheme({
  colorScheme: "light" as ColorScheme,
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    defaults: {
      color: "mainForeground",
    },
    header: {
      fontWeight: "bold",
      fontSize: 30,
      fontFamily: "SFProDisplayBold",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
  },
});

export const darkTheme: Theme = {
  ...theme,
  colorScheme: "dark",
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
  },
};

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
