import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const centerX = width / 2;
const centerY = height / 2;

export const Pinch = () => {
  const active = useSharedValue(false);
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { translateX: originX.value },
      { translateY: originY.value },
      { scale: scale.value },
      { translateX: -originX.value },
      { translateY: -originY.value },
    ],
  }));
  const gesture = Gesture.Pinch()
    .onChange(({ focalX, focalY, ...event }) => {
      "worklet";
      if (!active.value) {
        active.value = true;
        originX.value = focalX - centerX;
        originY.value = focalY - centerY;
      }
      scale.value = event.scale;
    })
    .onEnd(() => {
      "worklet";
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      active.value = false;
    });
  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.ball, style]} />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "black",
  },
});
