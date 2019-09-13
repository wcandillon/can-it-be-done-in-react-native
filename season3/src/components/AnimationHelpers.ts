import Animated from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import { onGestureEvent } from "react-native-redash";

const { Value } = Animated;

// eslint-disable-next-line import/prefer-default-export
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
