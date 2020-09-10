import React, { ReactElement } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

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

const SortableWord = ({ offsets, index, children }: SortableWordProps) => {
  return (
    <View
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => (offsets.value[index] = { width, height })}
    >
      {children}
    </View>
  );
};

export default SortableWord;
