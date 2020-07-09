import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  lessThan,
} from "react-native-reanimated";
import { transformOrigin } from "react-native-redash";

import HalfCircle from "./HalfCircle";
import { PI } from "./Constants";

interface CircularProgressProps {
  theta: Animated.Node<number>;
  bg: ReactNode;
  fg: ReactNode;
  radius: number;
}

export default ({ theta, bg, fg, radius }: CircularProgressProps) => {
  const opacity = lessThan(theta, PI);
  const rotate = interpolate(theta, {
    inputRange: [PI, 2 * PI],
    outputRange: [0, PI],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <>
      <View style={{ zIndex: 1 }}>
        <HalfCircle {...{ radius }}>
          <View style={{ transform: [{ rotate: "180deg" }] }}>{fg}</View>
        </HalfCircle>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: transformOrigin(
              { x: 0, y: radius / 2 },
              { rotate: theta }
            ),
            opacity,
          }}
        >
          <HalfCircle {...{ radius }}>{bg}</HalfCircle>
        </Animated.View>
      </View>
      <View style={{ transform: [{ rotate: "180deg" }] }}>
        <HalfCircle {...{ radius }}>{fg}</HalfCircle>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: transformOrigin({ x: 0, y: radius / 2 }, { rotate }),
          }}
        >
          <HalfCircle {...{ radius }}>{bg}</HalfCircle>
        </Animated.View>
      </View>
    </>
  );
};
