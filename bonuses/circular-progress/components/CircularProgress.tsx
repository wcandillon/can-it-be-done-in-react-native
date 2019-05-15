import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { DangerZone, Svg } from "expo";

const { Animated } = DangerZone;
const { Value, interpolate, multiply } = Animated;
const {
  Defs, LinearGradient, Stop, Circle,
} = Svg;
const { width } = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;

type Value = typeof Value;

interface CircularPogressProps {
  progress: Value;
}

export default ({ progress }: CircularPogressProps) => {
  const circumference = radius * 2 * PI;
  const α = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, PI * 2],
  });
  const strokeDashoffset = multiply(α, radius);
  return (
    <Svg width={size} height={size} style={styles.container}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor="#f7cd46" />
          <Stop offset="1" stopColor="#ef9837" />
        </LinearGradient>
      </Defs>
      <Circle
        stroke="rgba(255, 255, 255, 0.2)"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        {...{ strokeWidth }}
      />
      <AnimatedCircle
        stroke="url(#grad)"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ strokeDashoffset, strokeWidth }}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: "270deg" }],
  },
});
