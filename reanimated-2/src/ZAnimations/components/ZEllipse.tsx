import React from "react";
import Animated from "react-native-reanimated";
import { Transforms3d } from "react-native-redash";

import { addArc3, createPath3 } from "./Path3";
import ZPath from "./ZPath";

interface ZEllipseProps {
  rx: number;
  ry: number;
  stroke: string;
  strokeWidth: number;
  fill?: boolean;
  debug?: boolean;
  transform?: Transforms3d;
  progress?: Animated.SharedValue<number>;
}

const ZEllipse = ({
  rx: x,
  ry: y,
  stroke,
  strokeWidth,
  debug,
  fill,
  transform,
  progress,
}: ZEllipseProps) => {
  const path = createPath3({ x: 0, y: -y, z: 0 });
  addArc3(path, { x: x, y: -y, z: 0 }, { x: x, y: 0, z: 0 });
  addArc3(path, { x: x, y: y, z: 0 }, { x: 0, y: y, z: 0 });
  addArc3(path, { x: -x, y: y, z: 0 }, { x: -x, y: 0, z: 0 });
  addArc3(path, { x: -x, y: -y, z: 0 }, { x: 0, y: -y, z: 0 });
  return (
    <ZPath
      path={path}
      stroke={stroke}
      strokeWidth={strokeWidth}
      debug={debug}
      fill={fill}
      transform={transform}
      progress={progress}
    />
  );
};

export default ZEllipse;
