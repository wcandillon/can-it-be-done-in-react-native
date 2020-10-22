import React from "react";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";

import { Vector3 } from "./Vector";
import { addArc3, addLine3, createPath3 } from "./Path3";
import ZPath from "./ZPath";

interface ZRectProps {
  width: number;
  height: number;
  camera: Vector<Animated.SharedValue<number>>;
  canvas: Vector3;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  z: number;
}
const ZRect = ({
  width,
  height,
  camera,
  canvas,
  stroke,
  strokeWidth,
  debug,
  fill,
  z,
}: ZRectProps) => {
  const borderRadius = strokeWidth / 2;
  const xA = width / 2;
  const yA = height / 2;
  const shortSide = Math.min(xA, yA);
  const cornerRadius = Math.min(borderRadius, shortSide);
  const xB = xA - cornerRadius;
  const yB = yA - cornerRadius;

  const path = createPath3({ x: xB, y: -yA, z });
  addArc3(path, { x: xA, y: -yA, z }, { x: xA, y: -yB, z });
  if (yB) {
    addLine3(path, { x: xA, y: yB, z });
  }
  addArc3(path, { x: xA, y: yA, z }, { x: xB, y: yA, z });
  if (xB) {
    addLine3(path, { x: -xB, y: yA, z });
  }
  addArc3(path, { x: -xA, y: yA, z }, { x: -xA, y: yB, z });
  if (yB) {
    addLine3(path, { x: -xA, y: -yB, z });
  }
  addArc3(path, { x: -xA, y: -yA, z }, { x: -xB, y: -yA, z });
  if (yB) {
    addLine3(path, { x: xB, y: -yA, z });
  }
  return (
    <ZPath
      path={path}
      camera={camera}
      canvas={canvas}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      debug={debug}
    />
  );
};

export default ZRect;
