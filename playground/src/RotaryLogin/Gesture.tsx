import React from "react";
import { StyleSheet, View } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {
  canvas2Polar,
  PI,
  TAU,
  normalizeRad,
  clamp,
} from "react-native-redash";

import { RADIUS, DELTA } from "./Quadrant";

const SIZE = RADIUS * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  quadrant: {
    width: SIZE,
    height: SIZE,
  },
});

const denormalize = (value: number) => {
  "worklet";
  return value - TAU;
};

const add = (a: number, b: number) => {
  "worklet";
  const newVal = normalizeRad(a + b);
  if ((newVal < 0.5 * PI && a > 1.5 * PI) || a === 0) {
    return TAU;
  }
  if (newVal > 1.5 * PI && a < 0.5 * PI) {
    return 0.01;
  }
  return newVal;
};

interface GestureProps {
  theta: Animated.SharedValue<number>;
  passcode: Animated.SharedValue<string>;
}

const Gesture = ({ theta, passcode }: GestureProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offset: number }
  >({
    onStart: (_, ctx) => {
      ctx.offset = theta.value;
    },
    onActive: ({ x, y }, ctx) => {
      const { theta: alpha } = canvas2Polar({ x, y }, { x: RADIUS, y: RADIUS });
      const delta = alpha - ctx.offset;
      theta.value = add(theta.value, delta);
      ctx.offset = alpha;
    },
    onEnd: () => {
      const i = clamp(Math.abs(Math.round(theta.value / DELTA)) + 1, 0, 10);
      const val = i === 10 ? 0 : i;
      passcode.value += `${val}`;
      theta.value = denormalize(theta.value);
      theta.value = withSpring(0, { velocity: 0 });
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.quadrant} />
      </PanGestureHandler>
    </View>
  );
};

export default Gesture;
