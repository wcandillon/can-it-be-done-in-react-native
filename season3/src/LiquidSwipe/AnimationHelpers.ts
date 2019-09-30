import Animated, { Easing } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

const {
  Clock,
  Value,
  eq,
  cond,
  modulo,
  add,
  min,
  multiply,
  divide,
  max,
  block,
  timing,
  set,
  stopClock,
  startClock,
  not,
  clockRunning,
  spring,
  SpringUtils,
  onChange,
  useCode,
  debug,
  and
} = Animated;

export const followPointer = (value: Animated.Node<number>) => {
  const clock = new Clock();
  const config = SpringUtils.makeDefaultConfig();
  const state = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0)
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    spring(clock, state, config),
    state.position
  ]);
};

export const snapProgress = (
  value: Animated.Node<number>,
  gesture: Animated.Value<State>,
  isBack: Animated.Value<0 | 1>,
  point: Animated.Node<number>
) => {
  const clock = new Clock();
  const state = {
    time: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    finished: new Value(0)
  };
  const config = {
    toValue: new Value(0),
    duration: 3000,
    easing: Easing.inOut(Easing.ease)
  };
  const springState = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0)
  };
  const springConfig = SpringUtils.makeDefaultConfig();
  return block([
    cond(
      eq(gesture, State.ACTIVE),
      [stopClock(clock), set(state.position, value)],
      [
        cond(not(clockRunning(clock)), [
          set(state.time, 0),
          set(state.frameTime, 0),
          set(state.finished, 0),
          set(config.toValue, point),
          startClock(clock)
        ]),
        timing(clock, state, config),
        cond(and(eq(state.finished, 1), clockRunning(clock)), [
          set(isBack, point),
          stopClock(clock)
        ])
      ]
    ),
    state.position
  ]);
};
