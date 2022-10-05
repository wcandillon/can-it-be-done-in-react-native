import type { SkPath, Vector } from "@shopify/react-native-skia";
import {
  Canvas,
  Path,
  Skia,
  StrokeCap,
  StrokeJoin,
  useTouchHandler,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import { vec2 } from "react-native-redash";
import { createNoise2D } from "simplex-noise";

const { width, height } = Dimensions.get("window");
const center = vec2(width / 2, height / 2);
const r = 100;
const path = Skia.Path.Make();
path.moveTo(100, 100);
const drawLine = (p: SkPath, from: Vector, to: Vector, sample: number) => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;
  const dx = (x2 - x1) / sample;
  const dy = (y2 - y1) / sample;
  for (let i = 1; i <= sample; i++) {
    const x = x1 + dx * i;
    const y = y1 + dy * i;
    const n = A * noise(x * F, y * F);
    p.lineTo(x + n, y + n);
  }
};

const noise = createNoise2D();
const A = 10;
const F = 1;
const sample = 50;
drawLine(path, vec2(100, 100), vec2(300, 100), sample);
drawLine(path, vec2(300, 100), vec2(300, 500), sample);
drawLine(path, vec2(300, 500), vec2(100, 500), sample);
drawLine(path, vec2(100, 500), vec2(100, 100), sample);
path.close();

export const SongOfBloom = () => {
  const onTouch = useTouchHandler({});
  return (
    <Canvas style={{ width, height }} onTouch={onTouch}>
      <Path
        path={path}
        style="stroke"
        color="black"
        strokeWidth={1}
        strokeCap="round"
        strokeJoin="round"
      />
    </Canvas>
  );
};
