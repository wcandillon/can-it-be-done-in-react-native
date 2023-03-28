import { Canvas, Path, rect } from "@shopify/react-native-skia";
import React from "react";

import { drawNoisyRect } from "./Tools";

export const Puzzle2 = () => {
  const slices = 10;
  const paths = new Array(slices).fill(0).map((_, i) => {
    const width = 30;
    const pad = 5;
    return drawNoisyRect(rect(32 + i * (width + pad), 200, width, 400));
  });
  return (
    <Canvas style={{ flex: 1 }}>
      {paths.map((path, index) => (
        <Path key={index} path={path} />
      ))}
    </Canvas>
  );
};
