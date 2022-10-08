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
}

export const getPointAtLength = (length: number, from: Vector, to: Vector) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x = from.x + length * Math.cos(angle);
  const y = from.y + length * Math.sin(angle);
  return vec(x, y);
};

const F = 0.0008;
const noise = createNoise3D();

export const Symbol = ({ i, j, clock }: SymbolProps) => {
  const x = j * size;
  const y = i * size;
  const c = vec(x, y);
  const t2 = vec(x + size, y);
  const p2 = useComputedValue(() => {
    const theta = noise(x / width, y / height, clock.current * F) * Math.PI;
    return rotate(t2, c, theta);
  }, [clock]);
  return (
    <>
      <Line
        p1={c}
        p2={p2}
        style="stroke"
        color="white"
        strokeWidth={4}
        strokeCap="round"
      >
        <LinearGradient
          start={c}
          end={p2}
          colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0)"]}
        />
      </Line>
      <Circle color="white" r={2} c={c} />
    </>
  );
};
