import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AnimationState, defineAnimation } from "react-native-redash";

import Logo, { LOGO_WIDTH, LOGO_HEIGHT } from "./Logo";

const VELOCITY = 10;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

interface BouncingAnimationState extends AnimationState {
  lastTimestamp: number;
}

const withBouncing = (upperBound: number): number => {
  "worklet";
  return defineAnimation<BouncingAnimationState>(() => {
    "worklet";
    const onFrame = (state: BouncingAnimationState, now: number) => {
      const { lastTimestamp } = state;
      const dt = now - lastTimestamp;
      state.current += VELOCITY * (dt / 1000);
      if (state.current > upperBound) {
        state.current = upperBound;
      }
      return false;
    };
    const onStart = (
      state: BouncingAnimationState,
      value: number,
      now: number
    ) => {
      state.lastTimestamp = now;
      state.current = 0;
    };
    return {
      onFrame,
      onStart,
    };
  });
};

const DVDLogo = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  useEffect(() => {
    translateX.value = withBouncing(width - LOGO_WIDTH);
    translateY.value = withBouncing(height - LOGO_HEIGHT);
  }, [translateX, translateY]);
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={style}>
        <Logo />
      </Animated.View>
    </View>
  );
};

export default DVDLogo;
