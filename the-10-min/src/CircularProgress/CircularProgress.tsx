import React from "react";
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
}

export default ({ progress }: CircularProgressProps) => {
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
        <HalfCircle />
      </Animated.View>
      <Animated.View
        style={{
          opacity: bottomOpacity,
          transform: transformOrigin(0, -RADIUS / 2, { rotate: rotateBottom })
        }}
      >
        <HalfCircle flipped />
      </Animated.View>
    </>
  );
};
