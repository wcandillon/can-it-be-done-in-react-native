import Animated from "react-native-reanimated";
import { MutableRefObject } from "react";

export interface Offset {
  width: MutableRefObject<number>;
  height: MutableRefObject<number>;
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

export const calculateLayout = (offsets: Offset[], containerWidth: number) => {
  let vIndex = 0;
  let lastBreak = 0;
  offsets.forEach((offset, index) => {
    const total = offsets
      .slice(lastBreak, index)
      .reduce((acc, o) => acc + o.width.current, 0);
    if (total > containerWidth) {
      offset.x.value = 0;
      vIndex++;
      lastBreak = index;
    } else {
      offset.x.value = total;
    }
    offset.y.value = vIndex * offsets[0].height.current;
  });
};
