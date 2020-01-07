import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  add,
  interpolate,
  modulo,
  multiply,
  sub
} from "react-native-reanimated";

import { bInterpolateColor, polar2Canvas } from "react-native-redash";
import { CX, CY, PI, Ring, SIZE, STROKE_WIDTH, TAU } from "./Constants";
import Circle from "./Circle";
import AngularGradient from "./AngularGradient2";
import Courtain from "./Courtain";
import Shadow from "./Shadow";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});
const center = {
  x: CX,
  y: CY
};
const inputRange = [0, PI / 2, PI, PI + PI / 2, 2 * PI];
const so = 4;

interface RingProps {
  ring: Ring;
  progress: Animated.Node<number>;
}

export default ({ ring, progress }: RingProps) => {
  const theta = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, ring.value]
  });
  const revolution = interpolate(theta, {
    inputRange: [0, TAU],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });
  const rotate = interpolate(theta, {
    inputRange: [TAU, 2 * TAU],
    outputRange: [0, TAU],
    extrapolateLeft: Extrapolate.CLAMP
  });
  const r = (ring.size - STROKE_WIDTH) / 2;
  const { x, y } = polar2Canvas(
    { theta: multiply(-1, theta), radius: r },
    center
  );
  const translateX = sub(x, STROKE_WIDTH / 2);
  const translateY = sub(y, STROKE_WIDTH / 2);
  const backgroundColor = bInterpolateColor(revolution, ring.start, ring.end);
  const shadowOffsetX = interpolate(modulo(theta, TAU), {
    inputRange,
    outputRange: [0, so, 0, -so, 0].reverse()
  });
  const shadowOffsetY = interpolate(modulo(theta, TAU), {
    inputRange,
    outputRange: [so, 0, -so, 0, so].reverse()
  });
  return (
    <>
      <Animated.View style={[styles.overlay, { transform: [{ rotate }] }]}>
        <AngularGradient {...{ ring }} />
      </Animated.View>
      <View style={styles.overlay}>
        <Circle radius={ring.size / 2 - STROKE_WIDTH} backgroundColor="black" />
      </View>
      <View style={styles.overlay}>
        <Courtain {...{ ring, revolution }} />
      </View>
      <Animated.View style={styles.overlay}>
        <View style={{ width: SIZE, height: SIZE }}>
          <Animated.View
            style={{
              transform: [
                { translateX: add(translateX, shadowOffsetX) },
                { translateY: add(translateY, shadowOffsetY) }
              ]
            }}
          >
            <Shadow />
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View style={styles.overlay}>
        <View style={{ width: SIZE, height: SIZE }}>
          <Animated.View
            style={{
              transform: [{ translateX }, { translateY }]
            }}
          >
            <Circle radius={STROKE_WIDTH / 2} {...{ backgroundColor }} />
          </Animated.View>
        </View>
      </Animated.View>
    </>
  );
};
