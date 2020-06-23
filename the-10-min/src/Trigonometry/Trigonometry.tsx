import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import { useLoop } from "react-native-redash";

import Line from "./Line";

const { width } = Dimensions.get("window");
const radius = PixelRatio.roundToNearestPixel(width / 2);
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
    justifyContent: "center",
    alignItems: "center",
  },
});

const Trigonometry = () => {
  const progress = useLoop(2000);
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Line {...{ progress }} />
      </View>
    </View>
  );
};

export default Trigonometry;
