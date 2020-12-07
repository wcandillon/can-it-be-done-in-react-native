import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ForegroundProps {
  color: {
    start: string;
    end: string;
  };
}

const { width, height } = Dimensions.get("window");
const MIN_RADIUS = 50;
const MAX_RADIUS = 0.5 * Math.SQRT2 * Math.max(width, height);
const MAX_SCALE = MAX_RADIUS / MIN_RADIUS;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Foreground = ({ color }: ForegroundProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);
  const style = useAnimatedStyle(() => {
    return {
      width: MIN_RADIUS * 2,
      height: MIN_RADIUS * 2,
      borderRadius: MIN_RADIUS,
      transform: [{ scale: MAX_SCALE * progress.value }],
      backgroundColor: color.start,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={style} />
    </View>
  );
};

export default Foreground;
