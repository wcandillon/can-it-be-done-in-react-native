import Animated, {
  Clock,
  Value,
  add,
  and,
  block,
  clockRunning,
  cond,
  diff,
  divide,
  eq,
  floor,
  multiply,
  neq,
  not,
  or,
  decay as reDecay,
  set,
  startClock,
  stopClock,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  Vector,
  clamp,
  panGestureHandler,
  pinchActive,
  pinchBegan,
  pinchGestureHandler,
  snapPoint,
  timing,
  useClock,
  useValue,
  useVector,
  vec,
} from "react-native-redash";
import { Dimensions } from "react-native";
import { State } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

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
  clockX: Clock,
  clockY: Clock
) => {
  const x = decay(position.x, velocity.x, clockX);
  const y = decay(position.y, velocity.y, clockY);
  return {
    x,
    y,
  };
};

interface UseSwiperParams {
  pan: ReturnType<typeof panGestureHandler>;
  snapPoints: number[];
  index: Animated.Value<number>;
  translateX: Animated.Value<number>;
  translation: Vector<Animated.Value<number>>;
  minVec: Vector;
  maxVec: Vector;
  offset: Vector;
}

export const useSwiper = ({
  pan,
  snapPoints,
  index,
  translateX,
  translation,
  offset,
  minVec,
  maxVec,
}: UseSwiperParams) => {
  const offsetX = useValue(0);
  const clock = useClock();
  const snapTo = clamp(
    snapPoint(translateX, pan.velocity.x, snapPoints),
    multiply(add(index, 1), -width),
    multiply(sub(index, 1), -width)
  );
  const clamped = vec.sub(
    vec.clamp(vec.add(offset, pan.translation), minVec, maxVec),
    offset
  );
  const translationX = useValue(0);
  useCode(
    () => [
      // Calculate the extra value left to send to the swiper
      cond(eq(pan.state, State.ACTIVE), [
        vec.set(translation, clamped),
        set(translationX, sub(pan.translation.x, clamped.x)),
        set(translateX, add(offsetX, translationX)),
      ]),
      cond(and(eq(pan.state, State.END), neq(translationX, 0)), [
        set(translateX, timing({ clock, from: translateX, to: snapTo })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
        ]),
      ]),
    ],
    []
  );
};

interface UsePinchParams {
  pan: ReturnType<typeof panGestureHandler>;
  pinch: ReturnType<typeof pinchGestureHandler>;
  offset: Vector<Animated.Value<number>>;
  translation: Vector<Animated.Value<number>>;
  scaleOffset: Animated.Value<number>;
  scale: Animated.Value<number>;
  center: Vector;
}

export const usePinch = ({
  pan,
  pinch,
  offset,
  translation,
  scale,
  scaleOffset,
  center,
}: UsePinchParams) => {
  const origin = useVector(0, 0);
  const adjustedFocal = vec.sub(pinch.focal, vec.add(center, offset));
  useCode(
    () => [
      // PinchBegan: the focal value is the transformation of origin
      cond(pinchBegan(pinch.state), vec.set(origin, adjustedFocal)),
      // PinchActive, the focal value (minus its value at began) is the translation
      cond(pinchActive(pinch.state, pinch.numberOfPointers), [
        vec.set(
          translation,
          vec.add(
            vec.sub(adjustedFocal, origin),
            origin,
            vec.multiply(-1, pinch.scale, origin)
          )
        ),
      ]),
      // Gesture ended, keep offset, reset values,
      cond(
        and(
          or(eq(pinch.state, State.UNDETERMINED), eq(pinch.state, State.END)),
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
    ],
    []
  );
};

interface UseDecayParams {
  pan: ReturnType<typeof panGestureHandler>;
  pinch: ReturnType<typeof pinchGestureHandler>;
  offset: Vector<Animated.Value<number>>;
  minVec: Vector;
  maxVec: Vector;
}

export const useDecay = ({
  pinch,
  pan,
  offset,
  minVec,
  maxVec,
}: UseDecayParams) => {
  const shouldDecay = useValue(0);
  const clockX = useClock();
  const clockY = useClock();
  useCode(
    () => [
      // Decay animation (when releasing the pan gesture within the active image)
      cond(or(eq(pan.state, State.ACTIVE), eq(pinch.state, State.ACTIVE)), [
        stopClock(clockX),
        stopClock(clockY),
        set(shouldDecay, 0),
      ]),
      cond(
        and(
          neq(diff(pan.state), 0),
          eq(pan.state, State.END),
          neq(pinch.state, State.ACTIVE)
        ),
        set(shouldDecay, 1)
      ),
      cond(shouldDecay, [
        vec.set(
          offset,
          vec.clamp(
            decayVector(offset, pan.velocity, clockX, clockY),
            minVec,
            maxVec
          )
        ),
      ]),
    ],
    []
  );
};
