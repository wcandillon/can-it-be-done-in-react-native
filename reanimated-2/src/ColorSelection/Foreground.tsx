import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ForegroundProps {
  color: {
    start: string;
    end: string;
  };
  position: {
    x: number;
    y: number;
  };
}

const { width, height } = Dimensions.get("window");
const MIN_RADIUS = 50;

const Foreground = ({ color, position }: ForegroundProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 650,
      easing: Easing.inOut(Easing.ease),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);
  const style = useAnimatedStyle(() => {
    const MAX_RADIUS =
      Math.SQRT2 * Math.max(width / 2 + position.x, height / 2 + position.y);
    const MAX_SCALE = MAX_RADIUS / MIN_RADIUS;
    return {
      top: position.y - MIN_RADIUS * 2,
      left: position.x - MIN_RADIUS * 2,
      width: MIN_RADIUS * 2,
      height: MIN_RADIUS * 2,
      borderRadius: MIN_RADIUS,
      transform: [{ scale: MAX_SCALE * progress.value }],
      backgroundColor: color.start,
    };
  });
  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={style} />
    </View>
  );
};

export default Foreground;
