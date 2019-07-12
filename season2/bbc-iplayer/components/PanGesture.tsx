import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import {
  onGestureEvent,
  preserveOffset,
  runSpring,
  snapPoint
} from "react-native-redash";
import { State, PanGestureHandler } from "react-native-gesture-handler";

const {
  Clock,
  Value,
  useCode,
  set,
  modulo,
  divide,
  diff,
  sub,
  block,
  eq,
  cond,
  floor,
  ceil,
  not,
  clockRunning,
  stopClock
} = Animated;
const springConfig = {
  toValue: new Value(0),
  // these values have been selected from
  // http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  // we put high values here for the active animation to start fast
  restSpeedThreshold: 0.01,
  restDisplacementThreshold: 0.01
};

interface PanGestureProps {
  index: Animated.Value<number>;
  isActive: Animated.Value<number>;
  ratio: number;
  length: number;
}

export default ({ index, ratio, length, isActive }: PanGestureProps) => {
  const clock = new Clock();
  const shouldSnap = new Value(0);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureEvent = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const translateX = preserveOffset(translationX, state);
  const increment = divide(diff(translateX), ratio);
  const setIndex = (value: Animated.Node<number>) =>
    set(index, modulo(value, length));
  useCode(
    block([
      setIndex(sub(index, increment)),
      cond(eq(state, State.BEGAN), [stopClock(clock), set(isActive, 1)]),
      cond(eq(state, State.END), [
        set(state, State.UNDETERMINED),
        set(shouldSnap, 1)
      ]),
      cond(eq(shouldSnap, 1), [
        setIndex(
          runSpring(
            clock,
            index,
            snapPoint(index, divide(velocityX, -ratio), [
              ceil(index),
              floor(index)
            ]),
            springConfig
          )
        ),
        cond(not(clockRunning(clock)), [set(shouldSnap, 0), set(isActive, 0)])
      ])
    ]),
    []
  );
  return (
    <PanGestureHandler {...gestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
