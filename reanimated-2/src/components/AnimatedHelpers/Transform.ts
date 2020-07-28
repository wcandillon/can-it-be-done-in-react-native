import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Vector } from "./Vector";

export const useTranslate = (vector: Vector<Animated.SharedValue<number>>) =>
  useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: vector.x.value },
        { translateY: vector.y.value },
      ],
    };
  });
