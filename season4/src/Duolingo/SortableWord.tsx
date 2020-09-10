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
    const { total, lastBreak } = offsets.value.slice(0, index + 1).reduce(
      (acc, offset, i) => {
        if (acc.done) {
          return acc;
        }
        acc.total += offset.width;
        if (acc.total > containerWidth) {
          acc.done = true;
          acc.lastBreak = i;
          return acc;
        }
        return acc;
      },
      { done: false, total: 0, lastBreak: 0 }
    );

    const vIndex = Math.floor(total / containerWidth);
    const translateY = height * vIndex;
    const translateX = offsets.value
      .slice(lastBreak, index)
      .reduce((acc, offset) => acc + offset.width, 0);
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
