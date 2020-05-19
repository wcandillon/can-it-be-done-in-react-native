import Animated, {
  Clock,
  Value,
  block,
  clockRunning,
  cond,
  not,
  decay as reDecay,
  set,
  startClock,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";

const decay = (
  position: Animated.Adaptable<number>,
  velocity: Animated.Adaptable<number>,
  clock: Animated.Clock
) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity: new Value(0),
  };
  const config = { deceleration: 0.998 };
  return block([
    cond(not(clockRunning(clock)), [
      set(state.finished, 0),
      set(state.position, position),
      set(state.velocity, velocity),
      set(state.time, 0),
      startClock(clock),
    ]),
    reDecay(clock, state, config),
    state.position,
  ]);
};

export const decayVector = (
  position: Vector,
  velocity: Vector,
  clock: Vector<Clock>
) => {
  const x = decay(position.x, velocity.x, clock.x);
  const y = decay(position.y, velocity.y, clock.y);
  return {
    x,
    y,
  };
};
