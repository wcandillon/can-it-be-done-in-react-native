import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  PanGestureHandler,
  State,
  TouchableOpacity
} from "react-native-gesture-handler";
import Animated, {
  Value,
  and,
  block,
  cond,
  divide,
  eq,
  lessThan,
  multiply,
  not,
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
  const offset = new Value(MIN);
  const velocityX = new Value(0);
  const translationX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const translateX = withSpring({
    value: clamp(translationX, MIN, MAX + PADDING),
    velocity: velocityX,
    snapPoints: [MIN, MAX],
    state,
    offset
  });
  const trx = sub(1, divide(translateX, MIN));
  const opacity = bInterpolate(trx, 0.5, 1);
  const scale = bInterpolate(trx, 1, 1);
  const rotateY = bInterpolate(trx, alpha, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const snapTo = snapPoint(translationX, velocityX, [MIN, MAX]);
  useCode(
    () =>
      block([
        cond(and(eq(state, State.END), lessThan(trx, 0.1), eq(snapTo, MIN)), [
          set(open, 0)
        ]),
        cond(eq(open, 1), set(offset, sub(MIN, multiply(transition, MIN))))
      ]),
    [offset, open, snapTo, state, transition, trx]
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
