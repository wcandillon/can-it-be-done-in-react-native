import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  lessOrEq,
  multiply
} from "react-native-reanimated";
import { transformOrigin } from "react-native-redash";

import { PI, RADIUS, TAU } from "./Constants";
import HalfCircle from "./HalfCircle";

interface CircularProgressProps {
  progress: Animated.Node<number>;
  bg: string;
  fg: string;
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
    outputRange: [0, 1, 1],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <>
      <Animated.View style={{ zIndex: zIndexTop }}>
        <View style={StyleSheet.absoluteFill}>
          <HalfCircle color={fg} />
        </View>
        <Animated.View
          style={{
            opacity: topOpacity,
            transform: [
              ...transformOrigin(0, RADIUS / 2, { rotate: rotateTop })
            ]
          }}
        >
          <HalfCircle color={bg} />
        </Animated.View>
      </Animated.View>
      <View
        style={{
          transform: [{ rotateX: "180deg" }, { rotateY: "180deg" }]
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject
          }}
        >
          <HalfCircle color={fg} />
        </View>
        <Animated.View
          style={{
            transform: [
              ...transformOrigin(0, RADIUS / 2, { rotate: rotateBottom })
            ]
          }}
        >
          <HalfCircle color={bg} />
        </Animated.View>
      </View>
    </>
  );
};
