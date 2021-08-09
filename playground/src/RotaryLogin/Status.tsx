import React from "react";
import { Dimensions } from "react-native";
import type Animated from "react-native-reanimated";
import { Circle } from "react-native-svg";

import { center, RADIUS } from "./Quadrant";

const { width } = Dimensions.get("window");
const r = 8;
const p = 5;
const cx = width - (center.x - RADIUS);
const cy = center.y - RADIUS - 50;
interface StatusProps {
  passcode: Animated.SharedValue<string>;
}

const Status = ({ passcode }: StatusProps) => {
  return (
    <>
      {new Array(4).fill(0).map((_, i) => (
        <Circle
          cx={cx - i * 3 * r}
          cy={cy}
          r={r}
          fill="white"
          stroke="black"
          strokeWidth={4}
        />
      ))}
    </>
  );
};

export default Status;
