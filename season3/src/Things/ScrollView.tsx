import React, { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
import { snapPoint } from "react-native-redash";
import { panGestureHandlerWithY } from "../components/AnimationHelpers";

const {
  Value,
  Clock,
  eq,
  stopClock,
  startClock,
  not,
  decay: reDecay,
  spring: reSpring,
  clockRunning,
  set,
  neq,
  diffClamp,
  multiply,
  add,
  and,
  greaterOrEq,
  lessOrEq,
  cond,
  divide,
  diff,
  sub,
  pow,
  block,
  debug,
  exp,
  abs,
  lessThan,
  greaterThan
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface WithScrollParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  lowerBound: number;
  upperBound: number;
}

const EPS = 1e-3;
const EMPTY_FRAMES_THRESHOLDS = 5;

function stopWhenNeeded(dt, position, velocity, clock) {
  const ds = diff(position);
  const noMovementFrames = new Value(0);

  return cond(
    lessThan(abs(ds), EPS),
    [
      set(noMovementFrames, add(noMovementFrames, 1)),
      cond(
        greaterThan(noMovementFrames, EMPTY_FRAMES_THRESHOLDS),
        stopClock(clock)
      )
    ],
    set(noMovementFrames, 0)
  );
}

const spring = (
  dt: Animated.Adaptable<number>,
  position: Animated.Adaptable<number>,
  velocity: Animated.Value<number>,
  anchor: Animated.Adaptable<number>,
  mass: number = 1,
  tension: number = 300
) => {
  const dist = sub(position, anchor);
  const acc = divide(multiply(-1, tension, dist), mass);
  return set(velocity, add(velocity, multiply(dt, acc)));
};

const damping = (
  dt: Animated.Adaptable<number>,
  velocity: Animated.Value<number>,
  mass: number = 1,
  damp: number = 12
) => {
  const acc = divide(multiply(-1, damp, velocity), mass);
  return set(velocity, add(velocity, multiply(dt, acc)));
};

/*

  const lowerBound = -1 * (contentHeight - containerHeight);
  const upperBound = 0;

0. Start clock
1. When the gesture becomes active, we keep the dragging = 1, offset = position
2. When the gesture becomes inactive, draggin = 0
3. If the finger position (offset + value) is within lowerBound and upperBound position = offset + value
4. If offset + value > upperBound or offset + value < lowerBound, we add gravity to the translation
5. When the gesture becomes inactive and is in bound: decay. Decay must not go outside the bounds
6. When the gesture  becomes inactive and is outside the bounds: spring to the corresponding bound
*/
function withScroll({
  value,
  state,
  upperBound,
  lowerBound
}: WithScrollParams) {
  const dragging = new Value(0);
  const start = new Value(0);
  const position = new Value(0);
  const offset = new Value(0);
  const velocity = new Value(0);

  const clock = new Clock();
  const dt = divide(diff(clock), 1000);
  const isInBound = (v: Animated.Node<number>) =>
    and(lessOrEq(v, upperBound), greaterOrEq(v, lowerBound));

  return block([
    startClock(clock),
    cond(
      eq(state, State.ACTIVE),
      [
        cond(dragging, 0, [set(dragging, 1), set(start, position)]),
        set(offset, add(start, value)),
        cond(isInBound(offset), set(position, offset))
      ],
      [set(dragging, 0)]
    ),
    set(position, add(position, multiply(velocity, dt)))
  ]);
}

interface ScrollViewProps {
  children: ReactNode;
}

export default ({ children }: ScrollViewProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { gestureHandler, translationY, velocityY, state } = useMemoOne(
    () => panGestureHandlerWithY(),
    []
  );
  const lowerBound = -1 * (contentHeight - containerHeight);
  const upperBound = 0;
  const translateY = withScroll({
    value: translationY,
    velocity: velocityY,
    state,
    lowerBound,
    upperBound
  });
  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { height }
        }
      }) => setContainerHeight(height)}
    >
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{ translateY }]
          }}
          onLayout={({
            nativeEvent: {
              layout: { height }
            }
          }) => setContentHeight(height)}
        >
          {children}
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
