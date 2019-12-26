import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");
const size = width - 32;
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    backgroundColor: "white",
    borderRadius: 16
  }
});

interface ScreenProps {
  alpha: Animated.Node<number>;
}

export default ({ alpha }: ScreenProps) => {
  return <View style={styles.container} />;
};
