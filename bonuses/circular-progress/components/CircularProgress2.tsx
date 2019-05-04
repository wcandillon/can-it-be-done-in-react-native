import * as React from "react";
import { Dimensions, StyleSheet, addons } from "react-native";
import { DangerZone, Svg } from "expo";
import SVGPath from "art/modes/svg/path";
import { φ } from "./AnimationHelpers";

const { Animated } = DangerZone;
const {
  Value, interpolate, multiply, add, sub,
} = Animated;
const {
  Defs, LinearGradient, Stop, Path,
} = Svg;

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const padding = strokeWidth / 2;
const radius = (size - strokeWidth) / 2;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const transformOrigin = (xCenter: number, yCenter: number) => {
  const x1toX2 = (x1: number) => x1 - xCenter;
  const x2toX1 = (x2: number) => x2 + xCenter;
  const y1toY2 = (y1: number) => (y1 * -1) - yCenter;
  const y2toY1 = (y2: number) => (y2 * -1) + yCenter;
  return {
    canvasToCartesian: (x: number, y: number) => [x1toX2(x), y1toY2(y)],
    cartesianToCanvas: (x: number, y: number) => [x2toX1(x), y2toY1(y)],
    polarToCartesian: (ϑ: number, r: number) => [radius * Math.cos(ϑ), r * Math.sin(ϑ)],
    polarToCanvas: (ϑ: number, r: number) => [x2toX1(radius * Math.cos(ϑ)), y2toY1(r * Math.sin(ϑ))],
  };
};
const A = PI + PI * 0.4;
const start = PI + (A - PI) / 2;
const end = PI * 2 - (A - PI) / 2;

const o = transformOrigin(radius, radius);
const d = SVGPath()
  .moveTo(...o.polarToCanvas(start, radius).map(c => c + padding))
  .arcTo(size / 2, padding, radius)
  .arcTo(...o.polarToCanvas(end, radius).map(c => c + padding), radius)
  .toSVG();

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
