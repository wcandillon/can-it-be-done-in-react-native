import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  spring,
  cond,
  set,
  clockRunning,
  startClock,
  stopClock,
  Value,
  add,
  multiply,
  lessThan,
  abs,
  modulo,
  round,
  interpolate,
  divide,
  sub,
  color,
  Extrapolate,
  Clock,
} = Animated;

type Clock = typeof Clock;
type Val = typeof Value | number;

export const toRad = (deg: Val): Val => multiply(deg, Math.PI / 180);
export const toDeg = (rad: Val): Val => multiply(rad, 180 / Math.PI);
export const translateZ = (perspective: Val, x: Val) => divide(perspective, sub(perspective, x));

export function runSpring(clock: Clock, value: Val, dest: Val) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}
