import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  addCurve,
  addLine,
  clamp,
  createPath,
  serialize,
} from "react-native-redash";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const M = 100;
const WIDTH = 150;
const MAX_HEIGHT = 400;

const Square = () => {
  const translateY = useSharedValue(WIDTH);
  const animatedProps = useAnimatedProps(() => {
    const progress = interpolate(
      translateY.value,
      [WIDTH, MAX_HEIGHT],
      [WIDTH, WIDTH / 2 + 25],
      Extrapolate.CLAMP
    );
    const H = translateY.value;
    const path = createPath({ x: M, y: 0 });
    addLine(path, { x: M + WIDTH, y: 0 });
    addCurve(path, {
      c1: { x: M + WIDTH, y: 0 },
      c2: { x: M + progress, y: 0 },
      to: { x: M + progress, y: H },
    });
    addLine(path, { x: M + WIDTH - progress, y: H });
    addLine(path, { x: M, y: 0 });
    return {
      d: serialize(path),
    };
  });
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = clamp(ctx.y + translationY, WIDTH, MAX_HEIGHT);
    },
    onEnd: ({ velocityY }) => {
      translateY.value = withSpring(WIDTH, {
        velocity: velocityY,
        overshootClamping: true,
      });
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Svg style={StyleSheet.absoluteFill}>
          <AnimatedPath animatedProps={animatedProps} fill="#7EDAB9" />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Square;
