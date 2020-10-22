import React from "react";

import { addArc3, createPath3 } from "./Path3";
import ZPath from "./ZPath";

interface ZEllipseProps {
  rx: number;
  ry: number;
  stroke: string;
  strokeWidth: number;
  debug?: boolean;
  z: number;
}

const ZEllipse = ({
  rx: x,
  ry: y,
  z,
  stroke,
  strokeWidth,
  debug,
}: ZEllipseProps) => {
  const path = createPath3({ x: 0, y: -y, z });
  addArc3(path, { x: x, y: -y, z }, { x: x, y: 0, z });
  addArc3(path, { x: x, y: y, z }, { x: 0, y: y, z });
  addArc3(path, { x: -x, y: y, z }, { x: -x, y: 0, z });
  addArc3(path, { x: -x, y: -y, z }, { x: 0, y: -y, z });
  return (
    <ZPath
      path={path}
      stroke={stroke}
      strokeWidth={strokeWidth}
      debug={debug}
    />
  );
};

export default ZEllipse;
