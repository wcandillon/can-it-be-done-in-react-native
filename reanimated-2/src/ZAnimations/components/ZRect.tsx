import React from "react";
import { Transforms3d } from "react-native-redash";

import { addArc3, addLine3, createPath3 } from "./Path3";
import ZPath from "./ZPath";

interface ZRectProps {
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  transform?: Transforms3d;
}

const ZRect = ({
  width,
  height,
  stroke,
  strokeWidth,
  debug,
  fill,
  transform,
}: ZRectProps) => {
  const borderRadius = strokeWidth / 2;
  const xA = width / 2;
  const yA = height / 2;
  const shortSide = Math.min(xA, yA);
  const cornerRadius = Math.min(borderRadius, shortSide);
  const xB = xA - cornerRadius;
  const yB = yA - cornerRadius;

  const path = createPath3({ x: xB, y: -yA, z: 0 });
  addArc3(path, { x: xA, y: -yA, z: 0 }, { x: xA, y: -yB, z: 0 });
  if (yB) {
    addLine3(path, { x: xA, y: yB, z: 0 });
  }
  addArc3(path, { x: xA, y: yA, z: 0 }, { x: xB, y: yA, z: 0 });
  if (xB) {
    addLine3(path, { x: -xB, y: yA, z: 0 });
  }
  addArc3(path, { x: -xA, y: yA, z: 0 }, { x: -xA, y: yB, z: 0 });
  if (yB) {
    addLine3(path, { x: -xA, y: -yB, z: 0 });
  }
  addArc3(path, { x: -xA, y: -yA, z: 0 }, { x: -xB, y: -yA, z: 0 });
  if (yB) {
    addLine3(path, { x: xB, y: -yA, z: 0 });
  }
  return (
    <ZPath
      path={path}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      debug={debug}
      transform={transform}
    />
  );
};

export default ZRect;
