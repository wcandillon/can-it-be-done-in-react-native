import React from "react";
import type { SkRect } from "@shopify/react-native-skia";
import { Skia, vec, Group, Path } from "@shopify/react-native-skia";
import { createNoise2D } from "simplex-noise";

import { generateEllipsePoints, smoothPoints } from "./Tools";

interface TreeProps {
  rct: SkRect;
}

export const Tree = ({ rct }: TreeProps) => {
  const noise = createNoise2D();
  const p1 = generateEllipsePoints(rct, 20);
  const A = 20;
  const p2 = p1.map((point) => {
    const d = A * noise(point.x, point.y);
    return vec(point.x + d, point.y + d);
  });
  const points = smoothPoints(p2);
  const path = Skia.Path.Make();
  points.forEach((point, index) => {
    if (index === 0) {
      path.moveTo(point.x, point.y);
    } else {
      path.lineTo(point.x, point.y);
    }
  });
  path.close();
  return (
    <Group clip={path}>
      <Path path={path} color="#315E5E" />
      <Path
        path={path}
        color="#264948"
        transform={[{ translateX: -rct.width * 0.3 }]}
      />
    </Group>
  );
};
