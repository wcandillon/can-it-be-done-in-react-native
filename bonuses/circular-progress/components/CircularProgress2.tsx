import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { DangerZone, Svg } from "expo";

import { drawArc } from "./SVGHelpers";

const { Animated } = DangerZone;
const {
  Value, interpolate, multiply,
} = Animated;
const {
  Defs, LinearGradient, Stop, Path,
} = Svg;

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const A = PI + PI * 0.4;
const startAngle = PI + (A - PI) / 2;
const endAngle = PI * 2 - (A - PI) / 2;
const d = drawArc({
  x: radius,
  y: radius,
  radius,
  startAngle,
  endAngle,
  strokeWidth,
});

type Value = typeof Value;

interface CircularPogressProps {
  progress: Value;
}

export default ({ progress }: CircularPogressProps) => {
  const length = radius * A;
  const α = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, A],
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
      <AnimatedPath
        stroke="url(#grad)"
        fill="none"
        strokeDasharray={`${length}, ${length}`}
        {...{ strokeDashoffset, strokeWidth, d }}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});
