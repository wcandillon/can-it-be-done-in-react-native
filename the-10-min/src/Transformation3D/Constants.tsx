import Animated from "react-native-reanimated";

export const SIZE = 100;
export type Vec3 = {
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
  z: Animated.Adaptable<number>;
};
