import Animated from "react-native-reanimated";

export type SharedValues<T extends Record<string, string | number>> = {
  [K in keyof T]: Animated.SharedValue<T[K]>;
};

export const swap = (
  v1: Animated.SharedValue<number>,
  v2: Animated.SharedValue<number>
) => {
  const tmp = v1.value;
  v1.value = v2.value;
  v2.value = tmp;
};
