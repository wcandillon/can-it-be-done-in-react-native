import React, { ReactElement } from "react";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useVector } from "react-native-redash";

import { swap, useEffectOnUI } from "../components/AnimatedHelpers";

import { Offset, calculateLayout, reorder, print } from "./Layout";

export const between = (
  value: number,
  lowerBound: number,
  upperBound: number,
  inclusive = true
) => {
  "worklet";
  if (inclusive) {
    return value >= lowerBound && value <= upperBound;
  }
  return value > lowerBound && value < upperBound;
};

interface SortableWordProps {
  offsets: Offset[];
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
  const gestureActive = useSharedValue(false);
  const offset = offsets[index];
  const height = offset.height.value;
  const translation = useVector(offset.x.value, offset.y.value);
  const panOffset = useVector();
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      gestureActive.value = true;
      panOffset.x.value = translation.x.value;
      panOffset.y.value = translation.y.value;
    },
    onActive: (event) => {
      translation.x.value = panOffset.x.value + event.translationX;
      translation.y.value = panOffset.y.value + event.translationY;
      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i];
        if (o.order.value === offset.order.value) {
          continue;
        }
        if (
          between(translation.x.value, o.x.value, o.x.value + o.width.value) &&
          o.y.value === 0
            ? translation.y.value <= o.height.value
            : translation.y.value > o.height.value
        ) {
          console.log(`${offset.order.value} goes to ${o.order.value}`);
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);
          break;
        }
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      translation.x.value = withSpring(offset.x.value, {
        velocity: velocityX,
      });
      translation.y.value = withSpring(offset.y.value, {
        velocity: velocityY,
      });
    },
  });
  const translateX = useDerivedValue(() => {
    if (gestureActive.value) {
      return translation.x.value;
    } else {
      return withSpring(offset.x.value);
    }
  });
  const translateY = useDerivedValue(() => {
    if (gestureActive.value) {
      return translation.y.value;
    } else {
      return withSpring(offset.y.value);
    }
  });
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: offset.width.value,
    height: offset.height.value,
    zIndex: gestureActive.value ? 100 : 0,
    backgroundColor: "rgba(100, 200, 300, 0.5)",
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default SortableWord;
