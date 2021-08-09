import React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { between, canvas2Polar, clamp } from "react-native-redash";

import {
  approximates,
  normalize,
  PI,
  TAU,
} from "../components/Animations/Math";

import { RADIUS } from "./Quadrant";

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
  const newVal = normalize(a + b);
  if ((newVal < 0.5 * PI && a > 1.5 * PI) || a === 0) {
    return TAU;
  }
  return newVal;
};

interface GestureProps {
  theta: Animated.SharedValue<number>;
}

const Gesture = ({ theta }: GestureProps) => {
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
      theta.value = 0;
      return;
      //theta.value = denormalize(theta.value);
      //theta.value = withTiming(0, { duration: 5000 });
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
