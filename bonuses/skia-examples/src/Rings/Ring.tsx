import {
  Circle,
  Group,
  Path,
  Skia,
  SweepGradient,
  type Vector,
  Shadow,
  PathOp,
  Shader,
  Fill,
  mixColors,
} from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { frag } from "../components";

const source = frag`
uniform shader image;


vec2 rotate(in vec2 coord, in float angle, vec2 origin) {
  vec2 coord1 = coord - origin;
  vec2 rotated = coord1 * mat2( cos(angle), -sin(angle),
                       sin(angle),  cos(angle));
  return rotated + origin;
 }

vec4 main(vec2 xy) {
  return image.eval(xy);
}
`;

const fromCircle = (center: Vector, r: number) => {
  "worklet";
  return Skia.XYWHRect(center.x - r, center.y - r, r * 2, r * 2);
};

interface Ring {
  colors: string[];
  background: string;
  size: number;
  totalProgress: number;
}

interface RingProps {
  ring: Ring;
  center: Vector;
  strokeWidth: number;
}

export const Ring = ({
  center,
  strokeWidth,
  ring: { size, background, totalProgress, colors },
}: RingProps) => {
  return (
    <Group>
      <Fill color={background} />
    </Group>
  );
};
