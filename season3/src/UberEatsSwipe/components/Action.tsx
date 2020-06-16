import React from "react";
import Animated, {
  abs,
  divide,
  interpolate,
  Extrapolate,
  multiply,
  sub,
  greaterThan,
  cond,
  add,
  lessThan,
} from "react-native-reanimated";
import { useDebug } from "react-native-redash";

interface ActionProps {
  x: Animated.Node<number>;
}

const Action = ({ x }: ActionProps) => {
  const size = cond(lessThan(x, 60), x, add(x, sub(x, 60)));
  const translateX = divide(sub(size, x), 2);
  const borderRadius = divide(size, 2);
  const scale = interpolate(size, {
    inputRange: [10, 40],
    outputRange: [0.01, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{
        backgroundColor: "#D93F12",
        width: size,
        height: size,
        borderRadius,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateX }],
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          height: 5,
          width: 20,
          backgroundColor: "white",
        }}
      />
    </Animated.View>
  );
};

export default Action;
