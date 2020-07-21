import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useCode,
  set,
  divide,
  debug,
  multiply,
  defined,
  not,
  cond,
  Value,
  sub,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  usePanGestureHandler,
  withDecay,
  diffClamp,
  useScrollHandler,
  withSpring,
  clamp,
} from "react-native-redash";

import { ITEM_HEIGHT } from "./Constants";

interface GestureHandlerProps {
  value: Animated.Value<number>;
  max: number;
  defaultValue: number;
}

const GestureHandler = ({ value, max, defaultValue }: GestureHandlerProps) => {
  const { gestureHandler, position, velocity, state } = usePanGestureHandler();
  const translateY = diffClamp(
    withDecay({
      value: position.y,
      velocity: velocity.y,
      state,
    }),
    -ITEM_HEIGHT * (max - 1),
    0
  );
  useCode(() => set(value, divide(translateY, -ITEM_HEIGHT)), []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
