import { useFont, Text, Turbulence, Fill } from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import React from "react";
import { useWindowDimensions } from "react-native";

const typeface = require("./assets/MarckScript-Regular.ttf");
const subTypeface = require("./assets/Raleway-Medium.ttf");

interface GrainProps {
  children: ReactNode[];
}

export const Grain = ({ children }: GrainProps) => {
  const { width, height } = useWindowDimensions();
  const font = useFont(typeface, 100);
  const subFont = useFont(subTypeface, 24);
  const text = "Zürich";
  const subText = "Unterer Letten".toUpperCase();
  if (!font || !subFont) {
    return null;
  }
  const x1 = (width - font.getTextWidth(text)) / 2;
  const x2 = (width - subFont.getTextWidth(subText)) / 2;
  return (
    <>
      {children}
      <Text font={font} x={x1} y={height - 150} text={text} color="white" />
      <Text
        font={subFont}
        x={x2}
        y={height - 100}
        text={subText}
        color="white"
      />
      <Fill blendMode="softLight">
        <Turbulence freqX={1} freqY={1} octaves={3} />
      </Fill>
    </>
  );
};
