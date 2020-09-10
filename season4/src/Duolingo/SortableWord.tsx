import React, { ReactElement } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export interface Offset {
  width: number;
  height: number;
  x: number;
  y: number;
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
    const { width, height, x, y } = offsets.value[index];
    if (width === 0) {
      return {};
    }
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width,
      height,
      transform: [{ translateX: x }, { translateY: y }],
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
        const y = height * vIndex;
        const x = offsets.value
          .slice(lastBreak, index)
          .reduce((acc, offset) => acc + offset.width, 0);
        offsets.value[index] = { width, height, x, y };
        offsets.value = [...offsets.value];
      }}
    >
      {children}
    </Animated.View>
  );
};

export default SortableWord;
