import Animated, {
  Clock,
  block,
  clockRunning,
  cond,
  not,
  set,
  useCode
} from "react-native-reanimated";
import { timing } from "react-native-redash";

export const useToggle = (
  transition: Animated.Value<number>,
  trigger: Animated.Value<0 | 1>,
  from = 0,
  to = 1
) => {
  const clock = new Clock();
  useCode(
    () =>
      block([
        cond(trigger, set(transition, timing({ clock, from, to }))),
        cond(not(clockRunning(clock)), set(trigger, 0))
      ]),
    [clock, from, to, transition, trigger]
  );
};
