import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { onGestureEvent, decay } from "react-native-redash";
import { State, PanGestureHandler } from "react-native-gesture-handler";

const {
  Value,
  useCode,
  set,
  block,
  onChange,
  modulo,
  multiply,
  divide,
  diff,
  add,
  sub,
  acc,
  cond,
  eq
} = Animated;

interface PanGestureProps {
  index: Animated.Value<number>;
  ratio: number;
  length: number;
}

export default ({ index, ratio, length }: PanGestureProps) => {
  const offsetX = new Value(0);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureEvent = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const translateX = decay(translationX, state, velocityX);
  useCode(
    block([
      onChange(
        translateX,
        set(
          index,
          sub(length, modulo(divide(add(translateX, offsetX), ratio), length))
        )
      )
    ]),
    []
  );
  /*
      onChange(
        index,
        cond(
          eq(diff(translateX), 0),
          set(offsetX, add(offsetX, multiply(diff(index), -ratio)))
        )
      )
      */
  return (
    <PanGestureHandler {...gestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
