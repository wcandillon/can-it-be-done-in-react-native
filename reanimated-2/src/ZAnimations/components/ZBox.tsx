import React from "react";
import { View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import ZRect from "./ZRect";
import { useZSvg } from "./ZSvg";

interface ZBoxProps {
  z: Animated.SharedValue<number>;
  width: number;
  height: number;
  depth: number;
  front: string;
  back: string;
  left: string;
  right: string;
  top: string;
  bottom: string;
}

const ZBox = ({
  z,
  width,
  height,
  depth,
  front,
  back,
  top,
  bottom,
}: ZBoxProps) => {
  const { canvas } = useZSvg();
  const frontZ = useSharedValue(depth / 2);
  const backZ = useSharedValue(-depth / 2);
  const topZ = useSharedValue(0);
  return (
    <>
      <ZRect
        z={frontZ}
        width={width}
        height={height}
        stroke={front}
        strokeWidth={0}
        fill
      />
      <ZRect
        z={backZ}
        width={width}
        height={height}
        stroke={back}
        strokeWidth={0}
        fill
      />
      <ZRect
        z={topZ}
        width={width}
        height={depth}
        stroke={top}
        strokeWidth={0}
        transform={[
          { translateY: -(height * canvas.y) / 2 },
          { rotateX: Math.PI / 2 },
        ]}
        fill
      />
    </>
  );
};

export default ZBox;
