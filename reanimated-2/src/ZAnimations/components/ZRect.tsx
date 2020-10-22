import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";

import { addArc3, addLine3, createPath3 } from "./Path3";
import ZPath from "./ZPath";

interface ZRectProps {
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  z: Animated.SharedValue<number>;
}

const ZRect = ({
  width,
  height,
  stroke,
  strokeWidth,
  debug,
  fill,
  z,
  transform,
}: ZRectProps) => {
  const borderRadius = strokeWidth / 2;
  const xA = width / 2;
  const yA = height / 2;
  const shortSide = Math.min(xA, yA);
  const cornerRadius = Math.min(borderRadius, shortSide);
  const xB = xA - cornerRadius;
  const yB = yA - cornerRadius;

  const path = createPath3({ x: xB, y: -yA, z: z.value });
  addArc3(path, { x: xA, y: -yA, z: z.value }, { x: xA, y: -yB, z: z.value });
  if (yB) {
    addLine3(path, { x: xA, y: yB, z: z.value });
  }
  addArc3(path, { x: xA, y: yA, z: z.value }, { x: xB, y: yA, z: z.value });
  if (xB) {
    addLine3(path, { x: -xB, y: yA, z: z.value });
  }
  addArc3(path, { x: -xA, y: yA, z: z.value }, { x: -xA, y: yB, z: z.value });
  if (yB) {
    addLine3(path, { x: -xA, y: -yB, z: z.value });
  }
  addArc3(path, { x: -xA, y: -yA, z: z.value }, { x: -xB, y: -yA, z: z.value });
  if (yB) {
    addLine3(path, { x: xB, y: -yA, z: z.value });
  }
  return (
    <ZPath
      path={path}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      debug={debug}
      z={z}
      transform={transform}
    />
  );
};

export default ZRect;
