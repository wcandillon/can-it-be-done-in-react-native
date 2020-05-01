import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { set, useCode } from "react-native-reanimated";
import {
  canvas2Polar,
  usePanGestureHandler,
  withOffset,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");

interface GestureProps {
  theta: Animated.Value<number>;
}

const Gesture = ({ theta }: GestureProps) => {
  const { gestureHandler, translation, state } = usePanGestureHandler();
  const x = withOffset(translation.x, state);
  const y = withOffset(translation.y, state);
  const p = canvas2Polar({ x, y }, { x: width / 2, y: height / 2 });
  useCode(() => set(theta, p.theta), [p.theta, theta]);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default Gesture;
