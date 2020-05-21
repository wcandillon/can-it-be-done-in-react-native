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

const { width, height } = Dimensions.get("window");
export const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);

interface UsePinchParams {
  pinch: ReturnType<typeof pinchGestureHandler>;
  translateX: Animated.Value<number>;
  translateY: Animated.Value<number>;
  scale: Animated.Value<number>;
}

export const usePinch = ({
  pinch,
  translateX: x,
  translateY: y,
  scale,
}: UsePinchParams) => {
  const translate = { x, y };
  const translateOffset = vec.createValue(0, 0);
  const scaleOffset = new Value(1);
  const origin = vec.createValue(0, 0);
  const translation = vec.createValue(0, 0);
  const adjustedFocal = vec.sub(pinch.focal, vec.add(CENTER, translateOffset));
  useCode(
    () => [
      cond(pinchBegan(pinch.state), vec.set(origin, adjustedFocal)),
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
      cond(eq(pinch.state, State.END), [
        vec.set(translateOffset, vec.add(translateOffset, translation)),
        set(scaleOffset, scale),
        set(pinch.scale, 1),
        vec.set(translation, 0),
        vec.set(pinch.focal, 0),
      ]),
      set(scale, multiply(pinch.scale, scaleOffset)),
      vec.set(translate, vec.add(translation, translateOffset)),
    ],
    []
  );
};
