import Animated, {
  SpringUtils,
  Value,
  and,
  block,
  clockRunning,
  cond,
  eq,
  not,
  spring as reSpring,
  set,
  startClock,
  stopClock
} from "react-native-reanimated";

interface SpringConfig {
  clock: Animated.Clock;
  from: Animated.Adaptable<number>;
  to: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
}

// eslint-disable-next-line
export const spring = ({ clock, from, to, velocity }: SpringConfig) => {
  const config = { ...SpringUtils.makeDefaultConfig(), toValue: new Value(0) };
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity: new Value(0)
  };
  return block([
    cond(not(clockRunning(clock)), [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.time, 0),
      set(state.position, from),
      set(config.toValue, to),
      startClock(clock)
    ]),
    reSpring(clock, state, config),
    cond(eq(state.finished, 1), stopClock(clock)),
    state.position
  ]);
};
