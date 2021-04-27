import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withDecay,
  useAnimatedReaction,
} from "react-native-reanimated";
import { Matrix4, processTransform3d } from "react-native-redash";

import { Vector3 } from "./Vector";

interface CameraProps {
  camera: Animated.SharedValue<Matrix4>;
  canvas: Vector3;
}

const toRad = (v: number, size: number) => {
  "worklet";
  return (v / size) * 2 * Math.PI;
};

const Camera = ({ camera, canvas }: CameraProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  useAnimatedReaction(
    () => processTransform3d([{ rotateX: y.value }, { rotateY: x.value }]),
    (transform) => {
      camera.value = transform;
    }
  );
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      x: number;
      y: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + toRad(translationX, canvas.x);
      y.value = ctx.y + toRad(translationY, canvas.y);
    },
    onEnd: ({ velocityX, velocityY }) => {
      x.value = withDecay({
        velocity: toRad(velocityX, canvas.x),
      });
      y.value = withDecay({
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
