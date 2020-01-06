import React from "react";
import Animated from "react-native-reanimated";

interface CircleProps {
  backgroundColor: string | Animated.Node<number>;
  radius: number;
}
export default ({ radius, backgroundColor }: CircleProps) => (
  <Animated.View
    style={{
      backgroundColor,
      width: 2 * radius,
      height: 2 * radius,
      borderRadius: radius
    }}
  />
);
