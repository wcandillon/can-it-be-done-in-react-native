import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";

import { createPath3 } from "./Path3";
import ZEllipse from "./ZEllipse";
import ZPath from "./ZPath";

interface ZHemisphereProps {
  r: number;
  fill: string;
  backface: string;
  debug?: boolean;
  z: Animated.SharedValue<number>;
}

const ZHemisphere = ({ r, backface, fill, debug, z }: ZHemisphereProps) => {
  const z1 = useSharedValue(0);
  const z2 = useSharedValue(0);
  const path = createPath3({ x: -r, y: 0, z: z.value });
  return (
    <>
      <ZPath
        z={z1}
        path={path}
        stroke={fill}
        strokeWidth={0}
        debug={debug}
        fill
      />
      <ZEllipse
        rx={r}
        ry={r}
        z={z2}
        strokeWidth={0}
        stroke={backface}
        debug={debug}
        fill
      />
    </>
  );
};

export default ZHemisphere;
