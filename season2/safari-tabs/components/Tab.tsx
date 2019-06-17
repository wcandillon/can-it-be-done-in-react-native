import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const perspective = 1000;
const { width, height } = Dimensions.get("window");
const { multiply } = Animated;

interface TabProps {
  color: string;
}

export default ({ color: backgroundColor }: TabProps) => {
  const translateX = height / 2;
  const rotateX = "-27deg";
  return (
    <Animated.View
      style={{
        width,
        height,
        backgroundColor,
        flex: 1,
        transform: [
          { perspective },
          { translateX },
          { rotateX },
          { translateX: multiply(translateX, -1) }
        ]
      }}
    />
  );
};
