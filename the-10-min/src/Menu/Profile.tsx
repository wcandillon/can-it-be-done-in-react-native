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
  neq,
  not,
  onChange,
  set,
  useCode
} from "react-native-reanimated";
import {
  bInterpolate,
  clamp,
  onGestureEvent,
  snapPoint,
  spring
} from "react-native-redash";

import { alpha, perspective } from "./Constants";
import Content, { width } from "./Content";

const MIN = -width * Math.tan(alpha);
const MAX = 0;
const PADDING = 100;

const useToggle = (
  transition: Animated.Value<number>,
  trigger: Animated.Value<0 | 1>
) => {
  const clock = new Clock();
  useCode(
    () =>
      block([
        cond(trigger, set(transition, spring({ clock, from: 1, to: 0 }))),
        cond(not(clockRunning(clock)), set(trigger, 0))
      ]),
    [clock, transition, trigger]
  );
};

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
  const trigger = new Value(0);
  useToggle(transition, trigger);
  useCode(
    () =>
      block([
        set(localTransition, transition),
        onChange(state, cond(eq(state, State.END), set(shouldClose, 1))),
        cond(shouldClose, [
          set(
            localTransition,
            spring({
              clock,
              from: gestureTransition,
              to: cond(eq(snapTo, MIN), 0, 1)
            })
          ),
          cond(not(clockRunning(clock)), [
            set(trigger, eq(snapTo, MIN)),
            cond(neq(snapTo, MIN), set(shouldClose, 0)),
            cond(eq(transition, 0), set(shouldClose, 0))
          ])
        ])
      ]),
    [
      clock,
      gestureTransition,
      localTransition,
      shouldClose,
      snapTo,
      state,
      transition,
      trigger
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
