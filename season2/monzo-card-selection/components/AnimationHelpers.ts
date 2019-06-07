/* eslint-disable import/prefer-default-export */
import Animated, { Easing } from "react-native-reanimated";
import { runTiming } from "react-native-redash";

const { Clock, cond, block, eq, clockRunning } = Animated;

export const delay = (
  node: Animated.Node<number>,
  duration: number,
  nodeBefore: Animated.Adaptable<number> = 0
) => {
  const clock = new Clock();
  return block([
    runTiming(clock, 0, { toValue: 1, duration, easing: Easing.linear }),
    cond(eq(clockRunning(clock), 0), node, nodeBefore)
  ]);
};
