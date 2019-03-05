import { DangerZone } from "expo";

const { Animated, Easing } = DangerZone;

const MIN_SCALE = 1;
const MAX_SCALE = 2;

const {
  set,
  cond,
  eq,
  or,
  add,
  sub,
  min,
  max,
  multiply,
  divide,
  lessThan,
  decay,
  timing,
  diff,
  not,
  abs,
  startClock,
  stopClock,
  clockRunning,
  Value,
  Clock,
} = Animated;

function scaleDiff(value) {
  const tmp = new Value(1);
  const prev = new Value(1);
  return [set(tmp, divide(value, prev)), set(prev, value), tmp];
}

export function dragDiff(value, updating) {
  const tmp = new Value(0);
  const prev = new Value(0);
  return cond(
    updating,
    [set(tmp, sub(value, prev)), set(prev, value), tmp],
    set(prev, 0),
  );
}


// returns linear friction coeff. When `value` is 0 coeff is 1 (no friction), then
// it grows linearly until it reaches `MAX_FRICTION` when `value` is equal
// to `MAX_VALUE`
export function friction(value) {
  const MAX_FRICTION = 5;
  const MAX_VALUE = 100;
  return max(
    1,
    min(MAX_FRICTION, add(1, multiply(value, (MAX_FRICTION - 1) / MAX_VALUE))),
  );
}

function speed(value) {
  const clock = new Clock();
  const dt = diff(clock);
  return cond(lessThan(dt, 1), 0, multiply(1000, divide(diff(value), dt)));
}

function scaleRest(value) {
  return cond(
    lessThan(value, MIN_SCALE),
    MIN_SCALE,
    cond(lessThan(MAX_SCALE, value), MAX_SCALE, value),
  );
}

function scaleFriction(value, rest, delta) {
  const MAX_FRICTION = 20;
  const MAX_VALUE = 0.5;
  const res = multiply(value, delta);
  const howFar = abs(sub(rest, value));
  const friction = max(
    1,
    min(MAX_FRICTION, add(1, multiply(howFar, (MAX_FRICTION - 1) / MAX_VALUE))),
  );
  return cond(
    lessThan(0, howFar),
    multiply(value, add(1, divide(add(delta, -1), friction))),
    res,
  );
}

function runTiming(clock, value, dest, startStopClock = true) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    duration: 300,
    easing: Easing.inOut(Easing.cubic),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startStopClock && startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, startStopClock && stopClock(clock)),
    state.position,
  ];
}

function runDecay(clock, value, velocity) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = { deceleration: 0.99 };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(state.time, 0),
      startClock(clock),
    ]),
    set(state.position, value),
    decay(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

export function bouncyPinch(
  value,
  gesture,
  gestureActive,
  focalX,
  displacementX,
  focalY,
  displacementY,
) {
  const clock = new Clock();

  const delta = scaleDiff(gesture);
  const rest = scaleRest(value);
  const focalXRest = cond(
    lessThan(value, 1),
    0,
    sub(displacementX, multiply(focalX, add(-1, divide(rest, value)))),
  );
  const focalYRest = cond(
    lessThan(value, 1),
    0,
    sub(displacementY, multiply(focalY, add(-1, divide(rest, value)))),
  );
  const nextScale = new Value(1);

  return cond(
    [delta, gestureActive],
    [
      stopClock(clock),
      set(nextScale, scaleFriction(value, rest, delta)),
      set(
        displacementX,
        sub(displacementX, multiply(focalX, add(-1, divide(nextScale, value)))),
      ),
      set(
        displacementY,
        sub(displacementY, multiply(focalY, add(-1, divide(nextScale, value)))),
      ),
      nextScale,
    ],
    cond(
      or(clockRunning(clock), not(eq(rest, value))),
      [
        set(displacementX, runTiming(clock, displacementX, focalXRest, false)),
        set(displacementY, runTiming(clock, displacementY, focalYRest, false)),
        runTiming(clock, value, rest),
      ],
      value,
    ),
  );
}

export function bouncy(
  value,
  gestureDiv,
  gestureActive,
  lowerBound,
  upperBound,
  friction,
) {
  const timingClock = new Clock();
  const decayClock = new Clock();

  const velocity = speed(value);

  // did value go beyond the limits (lower, upper)
  const isOutOfBounds = or(
    lessThan(value, lowerBound),
    lessThan(upperBound, value),
  );
  // position to snap to (upper or lower is beyond or the current value elsewhere)
  const rest = cond(
    lessThan(value, lowerBound),
    lowerBound,
    cond(lessThan(upperBound, value), upperBound, value),
  );
  // how much the value exceeds the bounds, this is used to calculate friction
  const outOfBounds = abs(sub(rest, value));

  return cond(
    [gestureDiv, velocity, gestureActive],
    [
      stopClock(timingClock),
      stopClock(decayClock),
      add(value, divide(gestureDiv, friction(outOfBounds))),
    ],
    cond(
      or(clockRunning(timingClock), isOutOfBounds),
      [stopClock(decayClock), runTiming(timingClock, value, rest)],
      cond(
        or(clockRunning(decayClock), lessThan(5, abs(velocity))),
        runDecay(decayClock, value, velocity),
        value,
      ),
    ),
  );
}
