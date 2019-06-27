import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { onGestureEvent, runSpring, snapPoint } from "react-native-redash";
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
  add,
  block,
  cond,
  eq,
  stopClock
} = Animated;

const spring = (
  translation: Animated.Value<number>,
  state: Animated.Value<GestureState>,
  snapPt: (value: Animated.Node<number>) => Animated.Adaptable<number>,
  defaultOffset: number = 0
) => {
  const springedValue = new Value(0);
  const offset = new Value(defaultOffset);
  const clock = new Clock();
  const rerunSpring = new Value(0);
  // http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
  const springConfig = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001
  };
  return block([
    cond(
      eq(state, State.END),
      [
        set(
          springedValue,
          runSpring(
            clock,
            add(translation, offset),
            snapPt(add(translation, offset)),
            springConfig
          )
        )
      ],
      [
        stopClock(clock),
        cond(eq(state, State.BEGAN), [
          set(rerunSpring, 0),
          set(offset, sub(springedValue, translation))
        ]),
        set(springedValue, add(translation, offset))
      ]
    ),
    springedValue
  ]);
};

export const snap = (
  translation: Animated.Value<number>,
  velocity: Animated.Value<number>,
  state: Animated.Value<State>,
  ratio: number
) =>
  spring(translation, state, value => {
    const lowerBound = sub(value, modulo(value, ratio));
    const upperBound = add(lowerBound, ratio);
    return snapPoint(value, velocity, [lowerBound, upperBound]);
  });

interface PanGestureProps {
  index: Animated.Value<number>;
  ratio: number;
  length: number;
}

export default ({ index, ratio, length }: PanGestureProps) => {
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureEvent = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const translateX = snap(translationX, velocityX, state, ratio);
  const increment = divide(diff(translateX), ratio);
  useCode(set(index, modulo(sub(index, increment), length)), []);
  return (
    <PanGestureHandler {...gestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};
