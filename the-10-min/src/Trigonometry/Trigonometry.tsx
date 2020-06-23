import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import { mix, useLoop } from "react-native-redash";

import Line from "./Line";
import Driver from "./Driver";

const { width } = Dimensions.get("window");
const radius = PixelRatio.roundToNearestPixel(width / 2);
const circles = new Array(25).fill(0).map((_, i) => i);
const delta = Math.PI / circles.length;
const colors = [
  "#2D4CD2",
  "#36B6D9",
  "#3CF2B5",
  "#37FF5E",
  "#59FB2D",
  "#AFF12D",
  "#DABC2D",
  "#D35127",
  "#D01252",
  "#CF0CAA",
  "#A80DD8",
  "#5819D7",
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderWidth: 3,
    borderColor: "black",
  },
});

const Trigonometry = () => {
  const progress = useLoop(4000, false);
  const theta = mix(progress, 0, 2 * Math.PI);
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {circles.map((i) => (
          <Line
            color={colors[i % colors.length]}
            key={i}
            rotate={i * delta}
            {...{ theta, radius }}
          />
        ))}
        <Driver {...{ theta, radius }} />
      </View>
    </View>
  );
};

export default Trigonometry;
