import Animated, { Easing } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import { useMemoOne } from "use-memo-one";
import { bin } from "react-native-redash";

const {
  Value,
  cond,
  eq,
  block,
  set,
  Clock,
  spring,
  startClock,
  timing,
  neq,
  useCode
} = Animated;

export type TimingConfig = Partial<Omit<Animated.TimingConfig, "toValue">>;

export const withTimingTransition = (
  value: Animated.Value<number>,
  timingConfig: TimingConfig = {},
  gestureState: Animated.Value<State> = new Value(State.UNDETERMINED)
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear,
    ...timingConfig
  };
  return block([
    startClock(clock),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value)
    ]),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.position, value)],
      timing(clock, state, config)
    ),
    state.position
  ]);
};

export type SpringConfig = Partial<Omit<Animated.SpringConfig, "toValue">>;

export const withSpringTransition = (
  value: Animated.Value<number>,
  springConfig: SpringConfig = {},
  velocity: Animated.Adaptable<number> = 0,
  gestureState: Animated.Value<State> = new Value(State.UNDETERMINED)
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };
  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...springConfig
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.velocity, velocity), set(state.position, value)],
      spring(clock, state, config)
    ),
    state.position
  ]);
};

interface TimingTransition {
  config: TimingConfig;
  transition: typeof withTimingTransition;
}

interface SpringTransition {
  config: SpringConfig;
  transition: typeof withSpringTransition;
}

export const useTransition = <T extends TimingTransition | SpringTransition>(
  state: boolean,
  config: T["config"],
  withTransition: T["transition"]
) => {
  const value = useMemoOne(() => new Value(0), []);
  useCode(set(value, bin(state)), [state]);
  const transition = useMemoOne(() => withTransition(value, config), []);
  return transition;
};

export const useTimingTransition = (
  state: boolean,
  config: TimingConfig = {}
) => {
  const transition = useTransition(state, config, withTimingTransition);
  return transition;
};

export const useSpringTransition = (
  state: boolean,
  config: SpringConfig = {}
) => {
  const transition = useTransition(state, config, withSpringTransition);
  return transition;
};
