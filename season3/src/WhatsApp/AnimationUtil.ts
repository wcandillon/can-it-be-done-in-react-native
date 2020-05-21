import Animated, {
  Clock,
  Value,
  add,
  and,
  block,
  clockRunning,
  cond,
  divide,
  eq,
  floor,
  multiply,
  neq,
  not,
  onChange,
  decay as reDecay,
  set,
  startClock,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  Vector,
  clamp,
  panGestureHandler,
  snapPoint,
  timing,
  useClock,
  useValue,
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

export const decayVector = (
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
  clamped: Vector;
}

export const useSwiper = ({
  pan,
  snapPoints,
  index,
  translateX,
  translation,
  clamped,
}: UseSwiperParams) => {
  const offsetX = useValue(0);
  const clock = useClock();
  const snapTo = clamp(
    snapPoint(translateX, pan.velocity.x, snapPoints),
    multiply(add(index, 1), -width),
    multiply(sub(index, 1), -width)
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
