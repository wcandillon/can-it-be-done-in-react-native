import React from "react";

import { addArc3, addLine3, createPath3 } from "./Path3";
import ZPath from "./ZPath";

interface ZRectProps {
  width: number;
  height: number;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  z: number;
}
const ZRect = ({
  width,
  height,
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
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      debug={debug}
    />
  );
};

export default ZRect;
