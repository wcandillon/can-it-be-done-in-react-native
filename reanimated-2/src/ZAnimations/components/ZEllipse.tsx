import React from "react";
import Animated from "react-native-reanimated";

import { addArc3, createPath3 } from "./Path3";
import ZPath from "./ZPath";

interface ZEllipseProps {
  rx: number;
  ry: number;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  z: Animated.SharedValue<number>;
}

const ZEllipse = ({
  rx: x,
  ry: y,
  z,
  stroke,
  strokeWidth,
  debug,
  fill,
}: ZEllipseProps) => {
  const path = createPath3({ x: 0, y: -y, z: z.value });
  addArc3(path, { x: x, y: -y, z: z.value }, { x: x, y: 0, z: z.value });
  addArc3(path, { x: x, y: y, z: z.value }, { x: 0, y: y, z: z.value });
  addArc3(path, { x: -x, y: y, z: z.value }, { x: -x, y: 0, z: z.value });
  addArc3(path, { x: -x, y: -y, z: z.value }, { x: 0, y: -y, z: z.value });
  return (
    <ZPath
      path={path}
      stroke={stroke}
      strokeWidth={strokeWidth}
      debug={debug}
      fill={fill}
      z={z}
    />
  );
};

export default ZEllipse;
