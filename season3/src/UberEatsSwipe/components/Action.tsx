import React from "react";
import Animated, { abs, divide } from "react-native-reanimated";

interface ActionProps {
  x: Animated.Node<number>;
}

const Action = ({ x }: ActionProps) => {
  const size = abs(x);
  const borderRadius = divide(size, 2);
  return (
    <Animated.View
      style={{
        backgroundColor: "red",
        width: size,
        height: size,
        borderRadius,
      }}
    />
  );
};

export default Action;
