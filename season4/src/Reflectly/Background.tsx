import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const RADIUS = 45;
const { width, height } = Dimensions.get("window");

interface BackgroundProps {
  colorSelection: {
    position: { x: number; y: number };
    current: { start: string; end: string };
    previous: { start: string; end: string };
  };
}

const Background = ({ colorSelection }: BackgroundProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 650,
      easing: Easing.inOut(Easing.ease),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSelection]);
  const MAX_RADIUS =
    (Math.SQRT2 *
      Math.max(
        width + colorSelection.position.x,
        height + colorSelection.position.y
      )) /
    2;
  const style = useAnimatedStyle(() => {
    return {
      top: -RADIUS + colorSelection.position.y,
      left: -RADIUS + colorSelection.position.x,
      borderRadius: RADIUS,
      width: RADIUS * 2,
      height: RADIUS * 2,
      backgroundColor: colorSelection.current.start,
      transform: [{ scale: progress.value * (MAX_RADIUS / RADIUS) }],
    };
  });
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colorSelection.previous.start,
      }}
    >
      <Animated.View style={style} />
    </View>
  );
};

// eslint-disable-next-line ts-exports/unused-exports
export default Background;
