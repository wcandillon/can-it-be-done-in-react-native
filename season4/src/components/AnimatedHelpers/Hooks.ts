import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";

import { bin } from "./Math";

export const useSpring = (
  state: boolean | number,
  config?: Animated.WithSpringConfig
) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === "boolean" ? bin(state) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withSpring(value.value, config);
  });
  return transition;
};

export const useTiming = (
  state: boolean | number,
  config?: Animated.WithTimingConfig
) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === "boolean" ? bin(state) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withTiming(value.value, config);
  });
  return transition;
};
