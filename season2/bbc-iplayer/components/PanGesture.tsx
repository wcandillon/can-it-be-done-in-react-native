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
  cond,
  eq
} = Animated;

interface PanGestureProps {
  translateX: Animated.Value<number>;
  index: Animated.Value<number>;
  ratio: number;
  length: number;
}

export default ({ translateX, index, ratio, length }: PanGestureProps) => {
  // const offsetX = new Value(0);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureEvent = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const translateXNode = decay(translationX, state, velocityX);
  useCode(
    block([
      set(translateX, translateXNode),
      onChange(
        translateX,
        set(index, sub(length, modulo(divide(translateX, ratio), length)))
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
