import React from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Value,
  and,
  block,
  cond,
  debug,
  divide,
  eq,
  interpolate,
  multiply,
  onChange,
  set,
  sub,
  useCode
} from "react-native-reanimated";
import {
  bInterpolate,
  clamp,
  onGestureEvent,
  snapPoint,
  withSpring
} from "react-native-redash";

import { alpha, perspective } from "./Constants";
import Content, { width } from "./Content";

const MIN = -width * Math.tan(alpha);
const MAX = 0;
const PADDING = 100;

interface ProfileProps {
  open: Animated.Value<number>;
  transition: Animated.Node<number>;
}

export default ({ open, transition }: ProfileProps) => {
  const velocityX = new Value(0);
  const translationX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const x = withSpring({
    value: clamp(translationX, MIN, MAX + PADDING),
    velocity: velocityX,
    snapPoints: [MIN, MAX],
    state
  });
  const isActive = eq(transition, 1);
  const trx = cond(
    isActive,
    interpolate(x, {
      inputRange: [MIN, MAX],
      outputRange: [0, 1]
    }),
    transition
  );
  const translateX = bInterpolate(trx, MIN, 0);
  const opacity = bInterpolate(trx, 0.5, 1);
  const scale = bInterpolate(trx, 1, 1);
  const rotateY = bInterpolate(trx, alpha, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state
  });
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
        <Content {...{ open }} />
      </Animated.View>
    </PanGestureHandler>
  );
};
