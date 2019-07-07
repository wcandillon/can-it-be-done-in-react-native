import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, {
  Defs, LinearGradient, Stop, Circle,
} from "react-native-svg";
import Animated from "react-native-reanimated";

const { interpolate, multiply } = Animated;
const { width } = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

interface CircularPogressProps {
  progress: Animated.Value<number>;
}

export default ({ progress }: CircularPogressProps) => {
  const circumference = r * 2 * PI;
  const α = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, PI * 2],
  });
  const strokeDashoffset = multiply(α, r);
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
        {...{
          strokeWidth, cx, cy, r,
        }}
      />
      <AnimatedCircle
        stroke="url(#grad)"
        fill="none"
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{
          strokeDashoffset, strokeWidth, cx, cy, r,
        }}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: "270deg" }],
  },
});
