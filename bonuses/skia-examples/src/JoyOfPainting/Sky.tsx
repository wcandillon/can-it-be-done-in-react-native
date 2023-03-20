import type { SkRect } from "@shopify/react-native-skia";
import {
  center,
  Fill,
  LinearGradient,
  vec,
  Path,
  Skia,
  rect,
} from "@shopify/react-native-skia";
import React from "react";
import { useWindowDimensions } from "react-native";
import { createNoise2D } from "simplex-noise";

import { generateEllipsePoints, smoothPoints } from "./Tools";

interface CloudProps {
  rct: SkRect;
  flip?: boolean;
}

const Cloud = ({ rct, flip = false }: CloudProps) => {
  const noise = createNoise2D();
  const p1 = generateEllipsePoints(rct);
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
  const bounds = path.computeTightBounds();
  return (
    <Path
      path={path}
      origin={center(bounds)}
      transform={[{ scaleX: flip ? -1 : 1 }]}
    >
      <LinearGradient
        colors={["white", "rgba(255, 255, 255, 0)"]}
        start={vec(rct.x, rct.y)}
        end={vec(rct.x + rct.width, rct.y + rct.height)}
      />
    </Path>
  );
};

export const Sky = () => {
  const { height } = useWindowDimensions();
  return (
    <>
      <Fill>
        <LinearGradient
          colors={["#B4D7EB", "#87DBF3"]}
          start={vec(0, 0)}
          end={vec(0, height * 0.4)}
        />
      </Fill>
      <Cloud rct={rect(-150, 64, 350, 50)} />
      <Cloud rct={rect(250, 128, 350, 100)} flip />
      <Cloud rct={rect(-150, 200, 350, 120)} />
    </>
  );
};
