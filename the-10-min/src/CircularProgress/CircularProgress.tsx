import React, { ReactNode } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  greaterOrEq,
  interpolate,
  lessThan,
  multiply,
  sub
} from "react-native-reanimated";
import { bInterpolate, transformOrigin } from "react-native-redash";

import { PI, RADIUS, TAU } from "./Constants";
import HalfCircle from "./HalfCircle";
import { SIZE } from "../ShaderAndMask/Constants";

interface CircularProgressProps {
  progress: Animated.Node<number>;
  bg: ReactNode;
  fg: ReactNode;
}

export default ({ progress, bg, fg }: CircularProgressProps) => {
  const theta = sub(TAU, multiply(progress, TAU));
  const bottomOpacity = greaterOrEq(theta, PI);
  const rotateTop = interpolate(theta, {
    inputRange: [0, PI],
    outputRange: [0, -PI],
    extrapolate: Extrapolate.CLAMP
  });
  const rotateBottom = interpolate(theta, {
    inputRange: [PI, TAU],
    outputRange: [0, -PI],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <>
      <Animated.View
        style={{
          transform: transformOrigin(0, RADIUS / 2, { rotate: rotateTop })
        }}
      >
        <HalfCircle>{bg}</HalfCircle>
      </Animated.View>
      <Animated.View
        style={{
          opacity: bottomOpacity,
          transform: transformOrigin(0, -RADIUS / 2, { rotate: rotateBottom })
        }}
      >
        <HalfCircle flipped>{bg}</HalfCircle>
      </Animated.View>
    </>
  );
};
