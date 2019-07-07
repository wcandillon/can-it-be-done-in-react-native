import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import Svg, {
  Defs, LinearGradient, Stop, Path,
} from "react-native-svg";

// import { drawArc } from "./SVGHelpers";

const {
  Value, interpolate, multiply,
} = Animated;
const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const A = PI + PI * 0.4;
const start = PI + (A - PI) / 2;
const end = PI * 2 - (A - PI) / 2;
const drawArc = ({
  r, cx, cy, start: ϑ1, end: ϑ2,
}: {r: number, cx: number, cy: number, start: number, end: number }): string => {
  const x = (α: number) => cx - radius * Math.cos(α);
  const y = (α: number) => -radius * Math.sin(α) + cy;
  const ax = x(ϑ1);
  const ay = y(ϑ1);
  const bx = x(ϑ2);
  const by = y(ϑ2);
  return `
  M ${ax} ${ay}
  A ${r} ${r} 0 1 0 ${bx} ${by}`;
};
const d = drawArc({
  r: radius, cx: radius + strokeWidth / 2, cy: radius + strokeWidth / 2, start, end,
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
      <Path
        stroke="white"
        fill="none"
        strokeDasharray={`${length}, ${length}`}
        {...{ strokeWidth, d }}
      />
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
