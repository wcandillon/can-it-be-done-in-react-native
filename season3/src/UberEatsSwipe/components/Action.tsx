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

const styles = StyleSheet.create({
  remove: {
    color: "white",
    fontFamily: "UberMoveMedium",
    fontSize: 14,
  },
});

interface ActionProps {
  x: Animated.Node<number>;
  opacity: Animated.Node<number>;
}

const Action = ({ x, opacity }: ActionProps) => {
  const size = cond(lessThan(x, 60), x, add(x, sub(x, 60)));
  const translateX = divide(sub(size, x), 2);
  const borderRadius = divide(size, 2);
  const scale = interpolate(size, {
    inputRange: [10, 40],
    outputRange: [0.01, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity1 = interpolate(size, {
    inputRange: [50, 70],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity2 = interpolate(size, {
    inputRange: [50, 70],
    outputRange: [0, 1],
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
          opacity: opacity1,
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: multiply(opacity, opacity2),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.remove}>Remove</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Action;
