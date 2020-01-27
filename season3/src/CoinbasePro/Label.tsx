import React from "react";
import Animated, { concat, interpolate } from "react-native-reanimated";
import { ReText } from "react-native-redash";

interface LabelProps {
  domain: [number, number];
  size: number;
  y: Animated.Node<number>;
}

export default ({ domain: [min, max], size, y }: LabelProps) => {
  const value = interpolate(y, {
    inputRange: [0, size],
    outputRange: [min, max]
  });
  return (
    <Animated.View style={{ transform: [{ translateY: y }] }}>
      <ReText text={concat(value)} style={{ color: "white" }} />
    </Animated.View>
  );
};
