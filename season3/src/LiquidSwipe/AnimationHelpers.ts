import Animated, {
  Clock,
  Value,
  eq,
  cond,
  add,
  block,
  set,
  stopClock,
  startClock,
  not,
  clockRunning,
  spring,
  SpringUtils,
  and,
  diffClamp,
} from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

export const followPointer = (value: Animated.Node<number>) => {
  const clock = new Clock();
  const config = { ...SpringUtils.makeDefaultConfig(), toValue: new Value(0) };
  const state = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0),
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    spring(clock, state, config),
    state.position,
  ]);
};

export const snapProgress = (
  value: Animated.Node<number>,
  gesture: Animated.Value<State>,
  isBack: Animated.Value<0 | 1>,
  point: Animated.Adaptable<number>
) => {
  const offset = new Value(0);
  const clock = new Clock();
  const state = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    damping: 26,
    mass: 1,
    stiffness: 170,
    overshootClamping: false,
    restSpeedThreshold: 0.01,
    restDisplacementThreshold: 0.01,
  };
  return block([
    cond(
      eq(gesture, State.ACTIVE),
      [
        cond(
          clockRunning(clock),
          [stopClock(clock), set(offset, state.position)],
          set(state.position, diffClamp(add(offset, value), 0, 1))
        ),
      ],
      [
        cond(not(clockRunning(clock)), [
          set(state.time, 0),
          set(state.finished, 0),
          set(config.toValue, point),
          startClock(clock),
        ]),
        spring(clock, state, config),
        cond(and(eq(state.finished, 1), clockRunning(clock)), [
          set(isBack, point),
          stopClock(clock),
          set(offset, 0),
        ]),
      ]
    ),
    state.position,
  ]);
};
