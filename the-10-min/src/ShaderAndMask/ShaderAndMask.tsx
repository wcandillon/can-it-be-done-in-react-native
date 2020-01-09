import React from "react";
import { StyleSheet, View } from "react-native";
import { R1, R2, R3 } from "./Constants";
// import GradientShader from "./GradientShader";
import AngularGradient from "../components/AngularGradient";

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
  // Or: <GradientShader {...{ring}} />
  return (
    <View style={styles.container}>
      {[R1, R2, R3].reverse().map((ring, key) => (
        <View style={styles.overlay} {...{ key }}>
          <AngularGradient size={ring.size} colors={[ring.start, ring.end]} />
        </View>
      ))}
    </View>
  );
};
