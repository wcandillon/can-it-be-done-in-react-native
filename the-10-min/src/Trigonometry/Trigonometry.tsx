import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import { mix, useLoop } from "react-native-redash";

import Line from "./Line";
import Driver from "./Driver";

const { width } = Dimensions.get("window");
const radius = PixelRatio.roundToNearestPixel(width / 2);
const circles = new Array(30)
  .fill(0)
  .map((_, i) => i)
  .filter((i) => i % 2);
const delta = (2 * Math.PI) / circles.length;
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
  const progress = useLoop(2000, false);
  const theta = mix(progress, 0, 2 * Math.PI);
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {circles.map((i) => (
          <Line key={i} rotate={i * delta} {...{ theta, radius }} />
        ))}
        <Driver {...{ theta, radius }} />
      </View>
    </View>
  );
};

export default Trigonometry;
