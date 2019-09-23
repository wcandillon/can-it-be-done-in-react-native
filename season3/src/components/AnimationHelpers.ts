import Animated from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash";

const { Value, multiply, pow, sub } = Animated;

// Thanks Flutter 🙋🏼‍♂️
// https://bit.ly/2mgDDLF
export const frictionFactor = (ratio: Animated.Node<number>) =>
  multiply(0.52, pow(sub(1, ratio), 2));

export const verticalPanGestureHandler = () => {
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationY,
    velocityY,
    state
  });
  return {
    translationY,
    state,
    velocityY,
    gestureHandler
  };
};
