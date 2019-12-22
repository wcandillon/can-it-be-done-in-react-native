import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const size = 0.75 * (width - 32);
const center = size * 0.39;
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#323232",
    justifyContent: "center",
    alignItems: "center"
  },
  center: {
    width: center,
    height: center,
    borderRadius: center / 2,
    backgroundColor: "black"
  }
});

interface ClickWheelProps {}

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.center} />
    </View>
  );
};
