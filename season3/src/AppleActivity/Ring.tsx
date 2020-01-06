import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";

import { bInterpolateColor } from "react-native-redash";
import { Ring, STROKE_WIDTH, TAU } from "./Constants";
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
  const alpha = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, ring.value]
  });
  const revolution = interpolate(alpha, {
    inputRange: [0, TAU],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  const rotate = interpolate(alpha, {
    inputRange: [TAU, 2 * TAU],
    outputRange: [0, TAU],
    extrapolateLeft: Extrapolate.CLAMP
  });
  const backgroundColor = bInterpolateColor(revolution, ring.start, ring.end);
  return (
    <>
      <Animated.View style={[styles.overlay, { transform: [{ rotate }] }]}>
        <AngularGradient {...{ ring }} />
      </Animated.View>
      <View style={styles.overlay}>
        <Circle radius={ring.size / 2 - STROKE_WIDTH} backgroundColor="black" />
      </View>
      <View style={styles.overlay}>
        <Courtain {...{ ring, revolution, alpha }} />
      </View>
      <Animated.View style={[styles.overlay]}>
        <Circle radius={STROKE_WIDTH / 2} {...{ backgroundColor }} />
      </Animated.View>
    </>
  );
};
