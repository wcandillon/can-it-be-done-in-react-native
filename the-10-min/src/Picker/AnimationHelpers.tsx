import Animated, {
  Clock,
  Value,
  add,
  block,
  cond,
  eq,
  set,
  decay,
  debug,
  startClock,
} from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

interface WithDecayParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Node<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
}

export const withDecay = (config: WithDecayParams) => {
  const { value, velocity, state: gestureState, offset, deceleration } = {
    offset: new Value(0),
    deceleration: 0.998,
    ...config,
  };
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  return block([
    startClock(clock),
    cond(eq(gestureState, State.BEGAN), [set(offset, state.position)]),
    cond(eq(gestureState, State.ACTIVE), [
      set(state.position, add(offset, value)),
      set(state.velocity, velocity),
      set(state.time, 0),
      set(state.finished, 0),
    ]),
    cond(eq(gestureState, State.END), [decay(clock, state, { deceleration })]),
    state.position,
  ]);
};
