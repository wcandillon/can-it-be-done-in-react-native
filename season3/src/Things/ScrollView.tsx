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
  startClock,
  set,
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
  greaterThan
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function spring(
  dt: Animated.Node<number>,
  position: Animated.Adaptable<number>,
  velocity: Animated.Value<number>,
  anchor: Animated.Adaptable<number>,
  mass: number = 1,
  tension: number = 300
) {
  const dist = sub(position, anchor);
  const acc = divide(multiply(-1, tension, dist), mass);
  return set(velocity, add(velocity, multiply(dt, acc)));
}

const damping = (
  dt: Animated.Node<number>,
  velocity: Animated.Value<number>,
  mass: number = 1,
  coefficient: number = 12
) => {
  const acc = divide(multiply(-1, coefficient, velocity), mass);
  return set(velocity, add(velocity, multiply(dt, acc)));
};

const decay = (
  dt: Animated.Node<number>,
  velocity: Animated.Value<number>,
  deceleration: number = 0.997
) => {
  const kv = pow(deceleration, multiply(dt, 1000));
  const v = multiply(velocity, kv);
  return block([debug("velocity", v), set(velocity, v)]);
};

const gravity = (
  dt: Animated.Node<number>,
  position: Animated.Adaptable<number>,
  velocity: Animated.Value<number>,
  anchor: Animated.Adaptable<number>,
  gravityCenter: Animated.Adaptable<number>
) => {
  return block([
    spring(dt, position, velocity, anchor),
    damping(dt, velocity),
    spring(dt, position, velocity, gravityCenter),
    damping(dt, velocity)
  ]);
};

interface WithScrollParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  lowerBound: number;
  upperBound: number;
}

/*
0. Start clock
1. When the gesture becomes active, we keep the dragging = 1, offset = position
2. When the gesture becomes inactive, draggin = 0
3. If the finger position (offset + value) is within lowerBound and upperBound position = offset + value
4. If offset + value > upperBound or offset + value < lowerBound, we add gravity to the translation
5. When the gesture  becomes inactive and is outside the bounds: spring to the corresponding bound
6. Springing should rest at position and not trigger any decay
*/
function withScroll({
  value,
  state,
  velocity: gestureVelocity,
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

  const newPosition = add(position, multiply(velocity, dt));
  return block([
    startClock(clock),
    cond(
      eq(state, State.ACTIVE),
      [
        cond(dragging, 0, [set(dragging, 1), set(start, position)]),
        set(offset, add(start, value)),
        cond(
          isInBound(offset),
          [set(position, offset)],
          gravity(
            dt,
            position,
            velocity,
            offset,
            cond(greaterThan(offset, upperBound), upperBound, lowerBound)
          )
        )
      ],
      [
        cond(eq(dragging, 1), [
          set(velocity, gestureVelocity),
          set(dragging, 0)
        ]),
        cond(
          isInBound(position),
          [decay(dt, velocity)],
          [
            spring(
              dt,
              position,
              velocity,
              snapPoint(position, velocity, [lowerBound, upperBound])
            ),
            damping(dt, velocity)
          ]
        )
      ]
    ),
    set(position, newPosition)
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
