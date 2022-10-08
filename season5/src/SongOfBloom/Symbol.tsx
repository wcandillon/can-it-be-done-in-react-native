import type { SkiaValue, Vector } from "@shopify/react-native-skia";
import {
  clamp,
  rotate,
  dist,
  interpolate,
  Paint,
  Turbulence,
  LinearGradient,
  useComputedValue,
  Circle,
  Group,
  vec,
  Line,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import { createNoise2D, createNoise3D } from "simplex-noise";

const size = 30;
const { width, height } = Dimensions.get("window");
export const cols = Math.ceil(width / size);
export const rows = Math.ceil(height / size);

interface SymbolProps {
  i: number;
  j: number;
  clock: SkiaValue<number>;
  pos: SkiaValue<Vector>;
}

export const getPointAtLength = (length: number, from: Vector, to: Vector) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x = from.x + length * Math.cos(angle);
  const y = from.y + length * Math.sin(angle);
  return vec(x, y);
};

const F = 0.0008;
const noise = createNoise3D();

export const Symbol = ({ i, j, clock, pos }: SymbolProps) => {
  const x = j * size;
  const y = i * size;
  const c = vec(x, y);
  const p2 = useComputedValue(() => {
    const s = interpolate(
      dist(pos.current, c),
      [0, size, 350],
      [0, size, 0],
      "clamp"
    );
    return getPointAtLength(-s, c, pos.current);
  }, [pos]);
  return (
    <>
      <Line
        p1={p2}
        p2={c}
        style="stroke"
        color="rgba(255, 255, 255, 0.6)"
        strokeWidth={4}
        strokeCap="round"
      >
        <LinearGradient
          start={p2}
          end={c}
          colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0)"]}
        />
      </Line>
      <Circle color="white" r={2} c={p2} />
    </>
  );
};
