import React from "react";
import { StatusBar as RNStatusBar, Dimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const END = 125;
const { height: wHeight } = Dimensions.get("window");

interface BackgroundProps {
  height: SharedValue<number>;
}

export const Background = ({ height }: BackgroundProps) => {
  const { top } = useSafeAreaInsets();
  const start = wHeight - top;
  const backgroundStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: interpolate(height.value, [END, END + 100], [0, 0.3], "clamp"),
  }));
  const barStyle = useAnimatedStyle(() => ({
    backgroundColor: "black",
    height: top,
    opacity: interpolate(height.value, [start, start - 100], [1, 0], "clamp"),
  }));
  return (
    <>
      <Animated.View style={backgroundStyle} />
      <RNStatusBar barStyle="light-content" />
      <Animated.View style={barStyle} />
    </>
  );
};
