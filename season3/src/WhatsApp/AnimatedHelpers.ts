import Animated, {
  Value,
  cond,
  eq,
  multiply,
  set
} from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

// eslint-disable-next-line import/prefer-default-export
export const withScaleOffset = (
  value: Animated.Node<number>,
  state: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(1)
) =>
  cond(
    eq(state, State.END),
    [set(offset, multiply(offset, value)), offset],
    multiply(offset, value)
  );
