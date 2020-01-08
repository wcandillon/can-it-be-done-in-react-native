import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  greaterOrEq,
  interpolate,
  lessOrEq,
  lessThan,
  multiply,
  sub
} from "react-native-reanimated";
import { bInterpolate, transformOrigin } from "react-native-redash";

import { PI, RADIUS, TAU } from "./Constants";
import HalfCircle from "./HalfCircle";

interface CircularProgressProps {
  progress: Animated.Node<number>;
  bg: ReactNode;
  fg: (flipped?: boolean) => ReactNode;
}

export default ({ progress, bg, fg }: CircularProgressProps) => {
  const theta = multiply(progress, TAU);
  const topOpacity = lessOrEq(theta, PI);
  const rotateTop = interpolate(theta, {
    inputRange: [0, PI],
    outputRange: [0, PI],
    extrapolate: Extrapolate.CLAMP
  });
  const rotateBottom = interpolate(theta, {
    inputRange: [PI, TAU],
    outputRange: [0, PI],
    extrapolate: Extrapolate.CLAMP
  });
  const zIndexTop = interpolate(theta, {
    inputRange: [PI, PI, TAU],
    outputRange: [0, 100, 100],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <>
      <Animated.View style={{ zIndex: zIndexTop }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ rotateY: "180deg" }]
          }}
        >
          <HalfCircle>{fg()}</HalfCircle>
        </View>
        <Animated.View
          style={{
            opacity: topOpacity,
            transform: [
              ...transformOrigin(0, RADIUS / 2, { rotate: rotateTop })
            ]
          }}
        >
          <HalfCircle>{bg}</HalfCircle>
        </Animated.View>
      </Animated.View>
      <Animated.View>
        <View
          style={{
            ...StyleSheet.absoluteFillObject
          }}
        >
          <HalfCircle flipped>{fg(true)}</HalfCircle>
        </View>
        <Animated.View
          style={{
            transform: [
              ...transformOrigin(0, -RADIUS / 2, { rotate: rotateBottom })
            ]
          }}
        >
          <HalfCircle flipped>{bg}</HalfCircle>
        </Animated.View>
      </Animated.View>
    </>
  );
};
