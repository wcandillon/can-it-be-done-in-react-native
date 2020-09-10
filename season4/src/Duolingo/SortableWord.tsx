import React, { ReactElement } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

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
  const style = useAnimatedStyle(() => {
    const { width, height } = offsets.value[index];
    if (width === 0) {
      return {};
    }
    const total = offsets.value
      .slice(0, index)
      .reduce((acc, offset) => acc + offset.width, 0);
    const vIndex = Math.floor((total + width) / containerWidth);
    const translateY = height * vIndex;
    const translateX = total - vIndex * containerWidth;
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height,
      transform: [{ translateX }, { translateY }],
    };
  });
  return (
    <Animated.View
      style={style}
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => {
        offsets.value[index] = { width, height };
        offsets.value = [...offsets.value];
      }}
    >
      {children}
    </Animated.View>
  );
};

export default SortableWord;
