import React from "react";
import {
  State as GestureState,
  PanGestureHandler
} from "react-native-gesture-handler";
import Animated, {
  Value,
  block,
  cond,
  eq,
  interpolate,
  set,
  useCode
} from "react-native-reanimated";
import {
  bInterpolate,
  clamp,
  onGestureEvent,
  timing
} from "react-native-redash";

import { State, alpha, perspective } from "./Constants";
import Content, { width } from "./Content";

const MIN = -width * Math.tan(alpha);
const MAX = 0;
const PADDING = 100;

interface ProfileProps {
  state: Animated.Value<State>;
}

export default ({ state }: ProfileProps) => {
  const transition = new Value(0);
  const velocityX = new Value(0);
  const translationX = new Value(0);
  const gestureState = new Value(GestureState.UNDETERMINED);
  const x = clamp(translationX, MIN, MAX + PADDING);
  const translateX = bInterpolate(transition, MIN, 0);
  const opacity = bInterpolate(transition, 0.5, 1);
  const scale = bInterpolate(transition, 1, 1);
  const rotateY = bInterpolate(transition, alpha, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state: gestureState
  });
  useCode(
    () =>
      block([
        cond(eq(gestureState, GestureState.ACTIVE), [
          set(state, State.DRAGGING)
        ]),
        cond(eq(state, State.OPENING), [
          set(transition, timing({ from: 0, to: 1 }))
        ]),
        cond(eq(state, State.DRAGGING), [
          set(
            transition,
            interpolate(x, {
              inputRange: [MIN, MAX],
              outputRange: [0, 1]
            })
          )
        ])
      ]),
    [gestureState, state, transition, x]
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          opacity,
          transform: [
            perspective,
            { translateX },
            { translateX: -width / 2 },
            { rotateY },
            { translateX: width / 2 },
            { scale }
          ]
        }}
      >
        <Content />
      </Animated.View>
    </PanGestureHandler>
  );
};
