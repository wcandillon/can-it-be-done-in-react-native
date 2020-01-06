import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { Ring, STROKE_WIDTH } from "./Constants";
import Circle from "./Circle";
import AngularGradient from "./AngularGradient";
import Courtain from "./Courtain";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface RingProps {
  ring: Ring;
  progress: Animated.Node<number>;
}

export default ({ ring, progress }: RingProps) => {
  return (
    <>
      <View style={styles.overlay}>
        <AngularGradient {...{ ring }} />
      </View>
      <View style={styles.overlay}>
        <Circle radius={ring.size / 2 - STROKE_WIDTH} backgroundColor="black" />
      </View>
      <View style={styles.overlay}>
        <Courtain {...{ ring, progress }} />
      </View>
    </>
  );
};
