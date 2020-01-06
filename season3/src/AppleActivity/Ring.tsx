import React from "react";
import { StyleSheet, View } from "react-native";
import { RingProps, STROKE_WIDTH } from "./Constants";

import Circle from "./Circle";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default (ring: RingProps) => {
  return (
    <>
      <View style={styles.overlay}>
        <Circle radius={ring.size / 2} backgroundColor={ring.bg} />
      </View>
      <View style={styles.overlay}>
        <Circle radius={ring.size / 2 - STROKE_WIDTH} backgroundColor="black" />
      </View>
    </>
  );
};
