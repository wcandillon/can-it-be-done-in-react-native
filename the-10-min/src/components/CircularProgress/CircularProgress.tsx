import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  lessThan,
  multiply,
} from "react-native-reanimated";

import { transformOrigin } from "react-native-redash";
import HalfCircle from "./HalfCircle";

const { PI } = Math;

interface CircularProgressProps {
  progress: Animated.Node<number>;
  bg: string;
  fg: string;
  radius: number;
}

export default ({ progress, bg, fg, radius }: CircularProgressProps) => {
  const theta = multiply(progress, 2 * PI);
  const opacity = lessThan(theta, PI);
  const rotate = interpolate(theta, {
    inputRange: [PI, 2 * PI],
    outputRange: [0, PI],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <>
      <View style={{ zIndex: 1 }}>
        <HalfCircle color={fg} {...{ radius }} />
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
          <HalfCircle color={bg} {...{ radius }} />
        </Animated.View>
      </View>
      <View style={{ transform: [{ rotate: "180deg" }] }}>
        <HalfCircle color={fg} {...{ radius }} />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: transformOrigin({ x: 0, y: radius / 2 }, { rotate }),
          }}
        >
          <HalfCircle color={bg} {...{ radius }} />
        </Animated.View>
      </View>
    </>
  );
};
