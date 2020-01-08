import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  multiply
} from "react-native-reanimated";
import { bInterpolate, transformOrigin } from "react-native-redash";

import { PI, RADIUS, TAU } from "./Constants";
import HalfCircle from "./HalfCircle";
import { SIZE } from "../ShaderAndMask/Constants";

interface CircularProgressProps {
  progress: Animated.Node<number>;
}

export default ({ progress }: CircularProgressProps) => {
  const theta = multiply(progress, TAU);
  const rotateBottom = interpolate(theta, {
    inputRange: [0, PI],
    outputRange: [0, PI],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <>
      <Animated.View style={{ opacity: 0 }}>
        <HalfCircle />
      </Animated.View>
      <Animated.View
        style={{
          transform: [
            { translateY: -RADIUS / 2 },
            { rotate: rotateBottom },
            { translateY: RADIUS / 2 }
          ]
        }}
      >
        <HalfCircle flipped />
      </Animated.View>
    </>
  );
};
