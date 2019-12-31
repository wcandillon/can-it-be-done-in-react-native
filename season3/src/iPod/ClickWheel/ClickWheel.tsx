import React from "react";
import { StyleSheet, View } from "react-native";

import Buttons, { Command, size } from "./Buttons";
import Stickers from "./Stickers";

const { PI } = Math;
const hole = size * 0.39;
const center = {
  x: size / 2,
  y: size / 2
};

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
    width: hole,
    height: hole,
    borderRadius: hole / 2,
    backgroundColor: "black"
  }
});

interface ClickWheelProps {}

export default ({}: ClickWheelProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.center} />
      <Buttons />
      <Stickers />
    </View>
  );
};
