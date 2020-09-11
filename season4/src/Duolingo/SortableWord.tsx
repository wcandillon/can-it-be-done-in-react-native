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

import { swap } from "../components/AnimatedHelpers";

import { Offset, calculateLayout } from "./Layout";

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
      panOffset.x.value = offset.x.value;
      panOffset.y.value = offset.y.value;
    },
    onActive: (event) => {
      translation.x.value = offset.x.value + event.translationX;
      translation.y.value = offset.x.value + event.translationY;
      const offsetY = Math.floor(translation.y.value / height) * height;
      offsets.forEach((o, i) => {
        if (
          o.y.value === offsetY &&
          o.x.value >= translation.x.value &&
          translation.x.value <= o.x.value + o.width.value &&
          i !== index
        ) {
          swap(o.order, offset.order);
          swap(o.width, offset.width);
          swap(o.height, offset.height);
          calculateLayout(offsets, containerWidth);
        }
      });
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
  const translateX = useDerivedValue(() => translation.x.value);
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
    width: offsets[index].width.value,
    height: offsets[index].height.value,
    zIndex: gestureActive.value ? 100 : 0,
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
