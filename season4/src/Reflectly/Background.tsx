import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const MIN_RADIUS = 50;

interface ColorType {
  start: string;
  end: string;
}

interface BackgroundProps {
  colorSelection: {
    previous: ColorType;
    current: ColorType;
  };
  position: {
    x: number;
    y: number;
  };
}

const Background = ({ colorSelection, position }: BackgroundProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withSpring(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSelection]);
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
      backgroundColor: colorSelection.current.start,
    };
  });
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colorSelection.previous.start },
      ]}
    >
      <Animated.View style={style} />
    </View>
  );
};

export default Background;
