import { DangerZone } from "expo";

const { Animated, Easing } = DangerZone;
const {
  set,
  cond,
  eq,
  and,
  startClock,
  clockRunning,
  block,
  timing,
  Value,
} = Animated;

export function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(1),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  const reset = [
    set(state.finished, 0),
    set(state.time, 0),
    set(state.frameTime, 0),
  ];

  return block([
    cond(and(state.finished, eq(state.position, value)), [
      ...reset,
      set(config.toValue, dest),
    ]),
    cond(and(state.finished, eq(state.position, dest)), [
      ...reset,
      set(config.toValue, value),
    ]),
    cond(clockRunning(clock), 0, startClock(clock)),
    timing(clock, state, config),
    state.position,
  ]);
}
