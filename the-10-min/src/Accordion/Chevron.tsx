import React from "react";
import { StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { bInterpolate, bInterpolateColor } from "react-native-redash";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface ChevronProps {
  transition: Animated.Node<number>;
}

export default ({ transition }: ChevronProps) => {
  const rotateZ = bInterpolate(transition, Math.PI, 0);
  const backgroundColor = bInterpolateColor(
    transition,
    { r: 82, g: 82, b: 81 },
    { r: 228, g: 86, b: 69 }
  ) as Animated.Node<number>;
  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateZ }], backgroundColor }]}
    >
      <Icon name="chevron-down" color="white" size={24} />
    </Animated.View>
  );
};
