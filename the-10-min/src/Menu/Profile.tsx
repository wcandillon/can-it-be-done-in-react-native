import React from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Clock,
  Value,
  and,
  block,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  interpolate,
  lessThan,
  multiply,
  neq,
  not,
  onChange,
  or,
  set,
  sub,
  useCode
} from "react-native-reanimated";
import {
  approximates,
  bInterpolate,
  clamp,
  onGestureEvent,
  snapPoint,
  timing,
  withSpring
} from "react-native-redash";

import { alpha, perspective } from "./Constants";
import Content, { width } from "./Content";

const MIN = -width * Math.tan(alpha);
const MAX = 0;
const PADDING = 100;

interface ProfileProps {
  transition: Animated.Value<number>;
}

export default ({ transition }: ProfileProps) => {
  const clock = new Clock();
  const shouldClose = new Value(0);
  const localTransition = new Value(0);
  const velocityX = new Value(0);
  const translationX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const x = clamp(translationX, MIN, MAX + PADDING);
  /*
  withSpring({
    value: clamp(translationX, MIN, MAX + PADDING),
    velocity: velocityX,
    snapPoints: [MIN, MAX],
    state
  });
  */
  const gestureTransition = interpolate(x, {
    inputRange: [MIN, MAX],
    outputRange: [0, 1]
  });
  const trx = cond(eq(state, State.ACTIVE), gestureTransition, localTransition);
  const translateX = bInterpolate(trx, MIN, 0);
  const opacity = bInterpolate(trx, 0.5, 1);
  const scale = bInterpolate(trx, 1, 1);
  const rotateY = bInterpolate(trx, alpha, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const snapTo = snapPoint(x, velocityX, [MIN, MAX]);
  useCode(
    () =>
      block([
        set(localTransition, transition),
        onChange(state, cond(eq(state, State.END), set(shouldClose, 1))),
        cond(shouldClose, [
          set(
            localTransition,
            timing({
              clock,
              from: gestureTransition,
              to: cond(eq(snapTo, MIN), 0, 1)
            })
          ),
          cond(not(clockRunning(clock)), set(shouldClose, 0))
        ]),
        cond(and(eq(localTransition, 0), neq(transition, 0)), [
          set(transition, timing({ from: 1, to: 0 }))
        ])
        // cond(eq(open, 0), set(offset, MIN)),
        //  cond(shouldClose, [set(state, State.UNDETERMINED), set(open, 0)])
      ]),
    [
      clock,
      gestureTransition,
      localTransition,
      shouldClose,
      snapTo,
      state,
      transition
    ]
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
