import React from "react";
import { StyleSheet, processColor } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ChevronProps {
  transition: Animated.Node<number>;
}

export default ({ transition }: ChevronProps) => {
  const rotateZ = mix(transition, Math.PI, 0);
  const backgroundColor = mixColor(
    transition,
    processColor("#525251"),
    processColor("#e45645")
  ) as Animated.Node<number>;
  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateZ }], backgroundColor }]}
    >
      <Icon name="chevron-down" color="white" size={24} />
    </Animated.View>
  );
};
