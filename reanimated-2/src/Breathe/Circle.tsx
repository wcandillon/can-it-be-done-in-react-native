import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { clamp, mix, polar2Canvas } from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const SIZE = width / 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    opacity: 0.5,
  },
});

const transform = (theta: number, value: number) => {
  "worklet";
  const { x, y } = polar2Canvas({ theta, radius: SIZE / 2 }, { x: 0, y: 0 });
  const translateX = mix(value, 0, x);
  const translateY = mix(value, 0, y);
  return [{ translateX }, { translateY }, { scale: mix(value, 0.3, 1) }];
};

interface CircleProps {
  progress: Animated.SharedValue<number>;
  goesDown: Animated.SharedValue<boolean>;
  index: number;
}

const Circle = ({ progress, goesDown, index }: CircleProps) => {
  const theta = (index * (2 * Math.PI)) / 6;
  const style = useAnimatedStyle(() => {
    return {
      transform: transform(theta, progress.value),
    };
  });
  const style1 = useAnimatedStyle(() => {
    const value = goesDown.value
      ? clamp(progress.value + 0.1, 0, 1)
      : progress.value;
    return {
      opacity: interpolate(value, [0.6, 1], [0, 1], Extrapolate.CLAMP),
      transform: transform(theta, value),
    };
  });
  return (
    <>
      <Animated.View style={[styles.container, style1]}>
        <LinearGradient colors={["#62BFA1", "#529CA0"]} style={styles.circle} />
      </Animated.View>
      <Animated.View style={[styles.container, style]}>
        <LinearGradient colors={["#62BFA1", "#529CA0"]} style={styles.circle} />
      </Animated.View>
    </>
  );
};

export default Circle;
