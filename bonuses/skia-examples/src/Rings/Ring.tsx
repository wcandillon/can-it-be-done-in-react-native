import { Circle, type Vector } from "@shopify/react-native-skia";
import React from "react";

interface Ring {
  colors: string[];
  background: string;
  size: number;
  progress: number;
}

interface RingProps {
  ring: Ring;
  center: Vector;
  strokeWidth: number;
}

export const Ring = ({
  center,
  strokeWidth,
  ring: { size, background, colors },
}: RingProps) => {
  return (
    <>
      <Circle
        c={center}
        r={size / 2 - strokeWidth}
        color={background}
        style="stroke"
        strokeCap="round"
        strokeWidth={strokeWidth}
      />
      <Circle
        c={center}
        r={size / 2 - strokeWidth}
        color={colors[0]}
        style="stroke"
        strokeCap="round"
        strokeWidth={strokeWidth}
      />
    </>
  );
};
