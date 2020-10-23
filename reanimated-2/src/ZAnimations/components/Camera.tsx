import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withDecay,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";

import { Vector3 } from "./Vector";

interface CameraProps {
  camera: Vector<Animated.SharedValue<number>>;
  canvas: Vector3;
}

const TAU = 2 * Math.PI;

const toRad = (v: number, size: number) => {
  "worklet";
  return (v / size) * TAU;
};

const Camera = ({ camera, canvas }: CameraProps) => {
  const onGestureEvent = useAnimatedGestureHandler<{ x: number; y: number }>({
    onStart: (e, ctx) => {
      ctx.x = camera.x.value;
      ctx.y = camera.y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      camera.x.value = ctx.x + toRad(translationX, canvas.x);
      camera.y.value = ctx.y - toRad(translationY, canvas.y);
    },
    onEnd: ({ velocityX, velocityY }) => {
      camera.x.value = withDecay({
        velocity: toRad(velocityX, canvas.x),
      });
      camera.y.value = withDecay({
        velocity: toRad(velocityY, canvas.y),
      });
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default Camera;
