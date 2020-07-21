import React from "react";
import { StyleSheet } from "react-native";
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
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  usePanGestureHandler,
  withDecay,
  diffClamp,
  useValue,
} from "react-native-redash";

import { ITEM_HEIGHT } from "./Constants";

interface GestureHandlerProps {
  value: Animated.Value<number>;
  max: number;
  defaultValue: number;
}

const GestureHandler = ({ value, max, defaultValue }: GestureHandlerProps) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const offset = useValue(defaultValue * ITEM_HEIGHT);
  const translateY = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
      offset,
    }),
    0,
    max * ITEM_HEIGHT
  );
  useCode(() => [set(value, divide(translateY, ITEM_HEIGHT))], []);
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
