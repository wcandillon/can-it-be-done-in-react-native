import React, { ReactElement } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedRef,
  measure,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useEffectOnUI } from "../components/AnimatedHelpers";

export interface Offset {
  width: number;
  height: number;
}

interface SortableWordProps {
  offsets: Animated.SharedValue<Offset[]>;
  children: ReactElement<{ id: number }>;
  index: number;
  containerWidth: number;
}

const SortableWord = ({
  offsets,
  index,
  children,
  containerWidth,
}: SortableWordProps) => {
  const ref = useAnimatedRef<Animated.View>();
  useEffectOnUI(() => {
    "worklet";
    const { width, height } = measure(ref);
    if (width !== undefined) {
      offsets.value[index] = { width, height };
    }
  }, []);
  const style = useAnimatedStyle(() => {
    const { width, height } = offsets.value[index];
    if (width === 0) {
      return {};
    }
    const left = offsets.value
      .slice(0, index)
      .reduce((acc, offset) => acc + offset.width, 0);
    return { position: "absolute", top: 0, left, width, height };
  });
  return (
    <Animated.View style={style} ref={ref}>
      {children}
    </Animated.View>
  );
};

export default SortableWord;
