import type { SkRect } from "@shopify/react-native-skia";
import { vec, Group, Path, Skia } from "@shopify/react-native-skia";
import { createNoise2D } from "simplex-noise";

import { Palette } from "./Palette";
import { generateEllipsePoints, smoothPoints } from "./Tools";

interface TreeProps {
  rct: SkRect;
}

export const Tree = ({ rct }: TreeProps) => {
  const noise = createNoise2D();
  let points = generateEllipsePoints(rct);
  points = points.map((p, i) => {
    const A = 20;
    const F = 2;
    const d = A * noise(F * (i / (points.length - 1)), 0);
    return vec(p.x + d, p.y + d);
  });
  points = smoothPoints(points);
  const path = points.reduce((p, point, i) => {
    if (i === 0) {
      p.moveTo(point.x, point.y);
    } else {
      p.lineTo(point.x, point.y);
    }
    return p;
  }, Skia.Path.Make());
  return (
    <Group clip={path}>
      <Path path={path} color={Palette.silentBoughs} />
      <Path
        path={path}
        color={Palette.grove}
        transform={[{ translateX: -rct.width * 0.3 }]}
      />
    </Group>
  );
};
