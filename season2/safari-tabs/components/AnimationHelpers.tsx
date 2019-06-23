import { useMemo } from "react";
import Animated, { Easing, EasingFunction } from "react-native-reanimated";
import { runTiming } from "react-native-redash";

const { useCode, Clock, Value, set } = Animated;

// eslint-disable-next-line import/prefer-default-export
export const useTransition = (
  state: any,
  src: Animated.Adaptable<number>,
  dest: Animated.Adaptable<number>,
  duration: number = 400,
  easing: EasingFunction = Easing.linear
) => {
  const { transitionVal, clock } = useMemo(
    () => ({
      transitionVal: new Value(0),
      clock: new Clock()
    }),
    []
  );
  useCode(
    set(
      transitionVal,
      runTiming(clock, src, {
        toValue: dest,
        duration,
        easing
      })
    ),
    [state]
  );
  return transitionVal;
};
