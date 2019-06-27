import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { onGestureEvent, decay } from "react-native-redash";
import { State, PanGestureHandler } from "react-native-gesture-handler";

const { Value, useCode, set, modulo, divide, diff, sub } = Animated;

interface PanGestureProps {
  index: Animated.Value<number>;
  ratio: number;
  length: number;
}

export default ({ index, ratio, length }: PanGestureProps) => {
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureEvent = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const translateX = decay(translationX, state, velocityX);
  const increment = divide(diff(translateX), ratio);
  useCode(set(index, modulo(sub(index, increment), length)), []);
  return (
    <PanGestureHandler {...gestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
