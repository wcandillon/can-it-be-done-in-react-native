import React from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Clock,
  Value,
  and,
  block,
  call,
  clockRunning,
  cond,
  debug,
  eq,
  interpolate,
  multiply,
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
  timing
} from "react-native-redash";

import { alpha, perspective } from "./Constants";
import Content, { width } from "./Content";

const MIN = -width * Math.tan(alpha);
const MAX = 0;
const PADDING = 100;

interface ProfileProps {
  open: Animated.Value<0 | 1>;
  transition: Animated.Node<number>;
}

export default ({ open }: ProfileProps) => {
  const clock = new Clock();
  const isInteractionDone = new Value(0);
  const shouldOpen = new Value(0);
  const transition = new Value(0);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const x = clamp(translationX, MIN, MAX + PADDING);
  const translateX = bInterpolate(transition, MIN, 0);
  const opacity = bInterpolate(transition, 0.5, 1);
  const scale = bInterpolate(transition, 1, 0.9);
  const rotateY = bInterpolate(transition, alpha, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const gestureTransition = interpolate(x, {
    inputRange: [MIN, MAX],
    outputRange: [0, 1]
  });
  const snapTo = eq(snapPoint(x, velocityX, [MIN, MAX]), MAX);
  useCode(
    () =>
      block([
        onChange(open, set(shouldOpen, open)),
        cond(shouldOpen, [
          set(transition, timing({ clock, from: 0, to: 1 })),
          cond(not(clockRunning(clock)), set(shouldOpen, 0))
        ]),
        cond(eq(state, State.ACTIVE), [
          set(isInteractionDone, 0),
          set(transition, gestureTransition)
        ]),
        cond(and(eq(state, State.END), not(isInteractionDone)), [
          set(
            transition,
            timing({ clock, from: gestureTransition, to: snapTo })
          ),
          cond(not(clockRunning(clock)), [
            set(isInteractionDone, 1),
            cond(eq(snapTo, 0), [call([], () => open.setValue(0))])
          ])
        ])
      ]),
    [
      clock,
      gestureTransition,
      isInteractionDone,
      open,
      shouldOpen,
      snapTo,
      state,
      transition
    ]
  );
  return (
    <PanGestureHandler minDist={0} {...gestureHandler}>
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
