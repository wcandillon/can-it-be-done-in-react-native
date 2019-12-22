import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

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

interface ScreenProps {}

export default () => {
  return <View style={styles.container} />;
};
