import type { SkiaValue, Vector } from "@shopify/react-native-skia";
import {
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

const size = 30;
const { width, height } = Dimensions.get("window");
export const cols = Math.ceil(width / size);
export const rows = Math.ceil(height / size);

interface SymbolProps {
  i: number;
  j: number;
  pos: SkiaValue<Vector>;
}

export const getPointAtLength = (length: number, from: Vector, to: Vector) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x = from.x + length * Math.cos(angle);
  const y = from.y + length * Math.sin(angle);
  return vec(x, y);
};

export const Symbol = ({ i, j, pos }: SymbolProps) => {
  const x = j * size;
  const y = i * size;
  const c = vec(x + size / 2, y + size / 2);
  const p2 = useComputedValue(
    () =>
      getPointAtLength(
        interpolate(
          dist(pos.current, c),
          [0, Math.sqrt(width ** 2 + height ** 2)],
          [15, 0],
          "clamp"
        ),
        c,
        pos.current
      ),
    [pos]
  );
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
