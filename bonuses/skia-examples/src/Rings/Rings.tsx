import { Canvas, Fill, vec } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { Ring } from "./Ring";

const { width, height } = Dimensions.get("window");
const center = vec(width / 2, height / 2);

export const { PI } = Math;
export const TAU = 2 * PI;
export const SIZE = width;
export const strokeWidth = 40;

const rings = [
  {
    progress: 2.3,
    colors: ["rgb(0, 217, 253)", "rgb(0, 255, 169)"],
    background: "rgb(0, 72, 77)",
    size: SIZE - strokeWidth * 4,
  },
  {
    progress: 0.6,
    colors: ["rgb(153, 255, 0)", "rgb(216, 255, 1)"],
    background: "rgb(47, 78, 0)",
    size: SIZE - strokeWidth * 2,
  },
  {
    progress: 1.7,
    colors: ["rgb(249, 18, 78)", "rgb(249, 56, 133)"],
    background: "rgb(50, 1, 14)",
    size: SIZE,
  },
];

export const Rings = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="#010002" />
      {rings.map((ring, index) => {
        return (
          <Ring
            key={index}
            ring={ring}
            center={center}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </Canvas>
  );
};
