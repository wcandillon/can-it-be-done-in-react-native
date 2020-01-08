import React from "react";
import { StyleSheet, View } from "react-native";
import { R1, R2, R3 } from "./Constants";
import GradientShader from "./GradientShader";
// Same result with MaskedView
// import GradientMask from "./GradientMask";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000001"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  // Or: <GradientMask {...{ ring }} />
  return (
    <View style={styles.container}>
      {[R1, R2, R3].reverse().map((ring, key) => (
        <View style={styles.overlay} {...{ key }}>
          <GradientShader {...{ ring }} />
        </View>
      ))}
    </View>
  );
};
