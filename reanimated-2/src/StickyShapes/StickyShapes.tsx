import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Square, { SIZE, MAX_HEIGHT } from "./Square";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: (width - SIZE) / 2,
    top: 0,
    bottom: 0,
    width: SIZE,
  },
});

const StickyShapes = () => {
  const translateY = useSharedValue(0);
  const progress = useDerivedValue(() =>
    interpolate(translateY.value, [0, MAX_HEIGHT], [0, 1], Extrapolate.CLAMP)
  );
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      translateY.value = translationY;
    },
    onEnd: ({ velocityY: velocity }) => {
      translateY.value = withSpring(0, { velocity, overshootClamping: true });
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Square progress={progress} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default StickyShapes;
