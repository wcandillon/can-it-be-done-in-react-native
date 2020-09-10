import React, { ReactElement } from "react";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useVector } from "react-native-redash";

import { Offset } from "./Layout";

interface SortableWordProps {
  offsets: Offset[];
  children: ReactElement<{ id: number }>;
  index: number;
}

const SortableWord = ({ offsets, index, children }: SortableWordProps) => {
  const offset = offsets[index];
  const translation = useVector(offset.x.value, offset.y.value);
  const panOffset = useVector();
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      panOffset.x.value = offset.x.value;
      panOffset.y.value = offset.y.value;
    },
    onActive: (event) => {
      translation.x.value = offset.x.value + event.translationX;
      translation.y.value = offset.x.value + event.translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      translation.x.value = withSpring(offset.x.value, {
        stiffness: 100,
        mass: 1,
        damping: 10,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        velocity: velocityX,
      });
      translation.y.value = withSpring(offset.y.value, {
        stiffness: 100,
        mass: 1,
        damping: 10,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        velocity: velocityY,
      });
    },
  });
  const style = useAnimatedStyle(() => {
    const { width, height } = offsets[index];
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: width.current,
      height: height.current,
      transform: [
        { translateX: translation.x.value },
        { translateY: translation.y.value },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default SortableWord;
