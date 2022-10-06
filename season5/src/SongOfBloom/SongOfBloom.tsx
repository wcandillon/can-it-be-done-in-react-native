/* eslint-disable @typescript-eslint/no-var-requires */
import type { Vector } from "@shopify/react-native-skia";
import {
  Shadow,
  rect,
  useImage,
  PathOp,
  Canvas,
  Path,
  Skia,
  useTouchHandler,
  useValue,
  Image,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import { createNoise2D } from "simplex-noise";

const { width, height } = Dimensions.get("window");
const rct = rect(0, 0, width, height);

const F = 1;
const R = 15;
const sample = 50;

const drawCircle = (c: Vector) => {
  const noise = createNoise2D();
  const path = Skia.Path.Make();
  for (let i = 0; i < sample; i++) {
    const theta = (i / sample) * 2 * Math.PI;
    const r = 2 * R + R * noise(theta * F, 0);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    if (i === 0) {
      path.moveTo(x, y);
    } else {
      path.lineTo(x, y);
    }
  }
  path.close();
  const m3 = Skia.Matrix();
  m3.translate(c.x, c.y);
  path.transform(m3);
  return path;
};

export const SongOfBloom = () => {
  const bg = useImage(require("./assets/bg.png"));
  const mask = useImage(require("./assets/mask.png"));
  const path = useValue(Skia.Path.Make());
  const onTouch = useTouchHandler({
    onStart: (e) => {
      path.current = Skia.Path.MakeFromOp(
        path.current,
        drawCircle(e),
        PathOp.Union
      )!;
    },
    onActive: (e) => {
      path.current = Skia.Path.MakeFromOp(
        path.current,
        drawCircle(e),
        PathOp.Union
      )!;
    },
  });
  if (!bg || !mask) {
    return null;
  }
  return (
    <Canvas style={{ width, height }} onTouch={onTouch}>
      <Image image={bg} rect={rct} />
      <Path path={path} color="white">
        <Shadow dx={0} dy={0} blur={2} color="rgba(0,0,0,0.5)" inner />
      </Path>
      <Image image={mask} rect={rct} />
    </Canvas>
  );
};
