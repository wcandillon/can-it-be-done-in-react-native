import Animated, { Easing } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

import { Platform } from "react-native";
import { snapPoint } from "./Animations";
import { vec } from "./Vectors";

const {
  Clock,
  Value,
  add,
  block,
  cond,
  eq,
  set,
  stopClock,
  and,
  not,
  clockRunning,
  startClock,
  neq,
  call,
  timing: reTiming,
} = Animated;

export interface WithSpringParams {
  from: Animated.Adaptable<number>;
  to: Animated.Adaptable<number>;
  state: Animated.Node<State>;
  onSnap?: (value: readonly number[]) => void;
}

export const withTiming = (props: WithSpringParams) => {
  const { from, to, state, offset, onSnap } = {
    offset: new Value(0),
    ...props,
  };
  const clock = new Clock();
  const springState: Animated.TimingState = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config: Animated.TimingConfig = {
    toValue: new Value(0),
    easing: Easing.linear,
    duration: 400,
  };

  const gestureAndAnimationIsOver = new Value(1);
  const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishSpring = [
    set(offset, springState.position),
    stopClock(clock),
    set(gestureAndAnimationIsOver, 1),
  ];
  const snap = onSnap
    ? [cond(clockRunning(clock), call([springState.position], onSnap))]
    : [];
  return block([
    cond(isSpringInterrupted, finishSpring),
    cond(gestureAndAnimationIsOver, set(springState.position, offset)),
    cond(neq(state, State.END), [
      set(gestureAndAnimationIsOver, 0),
      set(springState.finished, 0),
      set(springState.position, add(offset, from)),
    ]),
    cond(and(eq(state, State.END), not(gestureAndAnimationIsOver)), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.frameTime, 0),
        set(springState.time, 0),
        set(config.toValue, to),
        startClock(clock),
      ]),
      reTiming(clock, springState, config),
      cond(springState.finished, [...snap, ...finishSpring]),
    ]),
    springState.position,
  ]);
};
