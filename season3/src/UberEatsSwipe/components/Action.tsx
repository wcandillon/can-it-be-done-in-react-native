import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  divide,
  interpolate,
  Extrapolate,
  sub,
  cond,
  add,
  lessThan,
  multiply,
} from "react-native-reanimated";

import { HEIGHT } from "./ItemLayout";

const styles = StyleSheet.create({
  remove: {
    color: "white",
    fontFamily: "UberMoveMedium",
    fontSize: 14,
  },
});

interface ActionProps {
  x: Animated.Node<number>;
  deleteOpacity: Animated.Node<number>;
}

const Action = ({ x, deleteOpacity }: ActionProps) => {
  const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)));
  const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2));
  const borderRadius = divide(size, 2);
  const scale = interpolate(size, {
    inputRange: [20, 30],
    outputRange: [0.01, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const iconOpacity = interpolate(size, {
    inputRange: [HEIGHT - 10, HEIGHT + 10],
    outputRange: [1, 0],
  });
  const textOpacity = sub(1, iconOpacity);
  return (
    <Animated.View
      style={{
        backgroundColor: "#D93F12",
        borderRadius,
        justifyContent: "center",
        alignItems: "center",
        height: size,
        width: size,
        transform: [{ translateX }],
      }}
    >
      <Animated.View
        style={{
          height: 5,
          width: 20,
          backgroundColor: "white",
          opacity: iconOpacity,
          transform: [{ scale }],
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          opacity: multiply(textOpacity, deleteOpacity),
        }}
      >
        <Text style={styles.remove}>Remove</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Action;
