import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { between, useVector } from "react-native-redash";

import { calculateLayout, Offset, reorder } from "./Layout";

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
  // const height = offset.height.value;
  const translation = useVector(offset.x.value, offset.y.value);
  const panOffset = useVector();
  const isInBank = offset.order.value === -1;
  const bankX = offset.originalX.value - 32;
  const bankY = offset.originalY.value + 200;
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      gestureActive.value = true;
      if (isInBank) {
        translation.x.value = bankX;
        translation.y.value = bankY;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      panOffset.x.value = translation.x.value;
      panOffset.y.value = translation.y.value;
    },
    onActive: (event) => {
      translation.x.value = panOffset.x.value + event.translationX;
      translation.y.value = panOffset.y.value + event.translationY;
      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i];
        if (
          offset.order.value !== o.order.value &&
          between(translation.x.value, o.x.value, o.x.value + o.width.value) &&
          between(translation.y.value, o.y.value, o.y.value + o.height.value)
        ) {
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);
          break;
        }
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      gestureActive.value = false;
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
      return withSpring(isInBank ? bankX : offset.x.value);
    }
  });
  const translateY = useDerivedValue(() => {
    if (gestureActive.value) {
      return translation.y.value;
    } else {
      return withSpring(isInBank ? bankY : offset.y.value);
    }
  });
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: offset.width.value,
      height: offset.height.value,
      zIndex: gestureActive.value ? 100 : 0,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SortableWord;
