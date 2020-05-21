import Animated, {
  Clock,
  Value,
  and,
  block,
  clockRunning,
  cond,
  diff,
  eq,
  lessThan,
  multiply,
  neq,
  not,
  or,
  proc,
  decay as reDecay,
  set,
  startClock,
  stopClock,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  Vector,
  panGestureHandler,
  pinchActive,
  pinchBegan,
  pinchGestureHandler,
  useValue,
  vec,
} from "react-native-redash";
import { Dimensions, Platform } from "react-native";
import { State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
export const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
const pinchEnd = proc(
  (state: Animated.Node<State>, numberOfPointers: Animated.Node<number>) =>
    Platform.OS === "android"
      ? or(eq(state, State.END), lessThan(numberOfPointers, 2))
      : eq(state, State.END)
);

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

const decayVector = (
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

interface UsePinchParams {
  pan: ReturnType<typeof panGestureHandler>;
  pinch: ReturnType<typeof pinchGestureHandler>;
  translate: Vector<Animated.Value<number>>;
  scale: Animated.Value<number>;
  translationX: Animated.Value<number>;
  minVec: Vector;
  maxVec: Vector;
}

export const usePinch = ({
  pinch,
  pan,
  translate,
  translationX,
  scale,
  minVec,
  maxVec,
}: UsePinchParams) => {
  const shouldDecay = useValue(0);
  const clock = vec.create(new Clock(), new Clock());
  const offset = vec.createValue(0, 0);
  const scaleOffset = new Value(1);
  const origin = vec.createValue(0, 0);
  const translation = vec.createValue(0, 0);
  const adjustedFocal = vec.sub(pinch.focal, vec.add(CENTER, offset));
  const clamped = vec.sub(
    vec.clamp(vec.add(offset, pan.translation), minVec, maxVec),
    offset
  );
  const isPinchBegan = pinchBegan(pinch.state);
  const isPinchActive = pinchActive(pinch.state, pinch.numberOfPointers);
  const isPinchEnd = pinchEnd(pinch.state, pinch.numberOfPointers);
  useCode(
    () => [
      cond(eq(pan.state, State.ACTIVE), [
        set(translationX, sub(pan.translation.x, clamped.x)),
        vec.set(translation, clamped),
      ]),
      cond(isPinchBegan, vec.set(origin, adjustedFocal)),
      cond(isPinchActive, [
        vec.set(
          translation,
          vec.add(
            vec.sub(adjustedFocal, origin),
            origin,
            vec.multiply(-1, pinch.scale, origin)
          )
        ),
      ]),
      cond(
        and(
          or(eq(pinch.state, State.UNDETERMINED), isPinchEnd),
          or(eq(pan.state, State.UNDETERMINED), eq(pan.state, State.END))
        ),
        [
          vec.set(offset, vec.add(offset, translation)),
          set(scaleOffset, scale),
          set(pinch.scale, 1),
          vec.set(translation, 0),
          vec.set(pinch.focal, 0),
        ]
      ),
      cond(or(eq(pan.state, State.ACTIVE), isPinchActive), [
        stopClock(clock.x),
        stopClock(clock.y),
        set(shouldDecay, 0),
      ]),
      cond(
        and(
          neq(diff(pan.state), 0),
          eq(pan.state, State.END),
          not(isPinchActive)
        ),
        set(shouldDecay, 1)
      ),
      cond(shouldDecay, [
        vec.set(
          offset,
          vec.clamp(decayVector(offset, pan.velocity, clock), minVec, maxVec)
        ),
      ]),
      set(scale, multiply(pinch.scale, scaleOffset)),
      vec.set(translate, vec.add(translation, offset)),
    ],
    []
  );
};
