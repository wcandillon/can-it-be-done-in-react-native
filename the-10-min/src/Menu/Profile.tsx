import React from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Clock,
  Value,
  and,
  block,
  clockRunning,
  cond,
  diff,
  divide,
  eq,
  interpolate,
  neq,
  not,
  set,
  stopClock,
  useCode,
} from "react-native-reanimated";
import {
  clamp,
  mix,
  onGestureEvent,
  snapPoint,
  spring,
  timing,
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

export default ({ open, transition: trx }: ProfileProps) => {
  const clock = new Clock();
  const isDone = new Value(0);
  const transition = new Value(0);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const x = clamp(translationX, MIN, MAX + PADDING);
  const translateX = mix(transition, MIN, 0);
  const opacity = mix(transition, 0.5, 1);
  const scale = mix(transition, 1, 0.9);
  const rotateY = mix(transition, alpha, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state,
  });
  const gestureTransition = interpolate(x, {
    inputRange: [MIN, MAX],
    outputRange: [0, 1],
  });
  const isOpening = and(neq(diff(trx), 0), open);
  const snapTo = eq(snapPoint(x, velocityX, [MIN, MAX]), MAX);
  useCode(
    () =>
      block([
        cond(isOpening, set(transition, trx)),
        cond(eq(state, State.BEGAN), stopClock(clock)),
        cond(eq(state, State.ACTIVE), [
          set(isDone, 0),
          set(transition, gestureTransition),
        ]),
        cond(and(eq(state, State.END), not(isDone)), [
          set(
            transition,
            cond(
              eq(snapTo, 1),
              spring({
                clock,
                velocity: divide(velocityX, -MIN),
                from: gestureTransition,
                to: 1,
              }),
              timing({ clock, from: gestureTransition, to: 0 })
            )
          ),
          cond(not(clockRunning(clock)), [
            set(isDone, 1),
            cond(eq(snapTo, 0), set(open, 0)),
          ]),
        ]),
      ]),
    [
      clock,
      gestureTransition,
      isDone,
      isOpening,
      open,
      snapTo,
      state,
      transition,
      trx,
      velocityX,
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
            { scale },
          ],
        }}
      >
        <Content />
      </Animated.View>
    </PanGestureHandler>
  );
};
