import React from "react";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const { PI, cos, sin } = Math;
const sampling = 2;
const step = (2 * PI) / sampling;

interface RingProps {
  index: number;
  cx: number;
  cy: number;
  r: number;
  strokeWidth: number;
  theta: Animated.Node<number>;
}

export default ({ strokeWidth, index, cx, cy, r, theta }: RingProps) => {
  const length = (r * 2 * PI) / 2;
  const x = (α: number) => cx - r * cos(α);
  const y = (α: number) => -r * sin(α) + cy;
  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  const arc = (α: number) => `A ${r} ${r} 0 0 1 ${x(α)} ${y(α)}`;
  const [d1, d2] = new Array(sampling).fill(0).map((_0, i) => {
    const α = i * step;
    return `M ${x(α)} ${y(α)} ${arc(α + step)}`;
  });
  const strokeDashoffset1 = interpolate(theta, {
    inputRange: [0, PI],
    outputRange: [0, length],
    extrapolate: Extrapolate.CLAMP
  });
  const strokeDashoffset2 = interpolate(theta, {
    inputRange: [PI, 2 * PI],
    outputRange: [0, length],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <>
      <AnimatedPath
        fill="none"
        stroke={`url(#angular-gradient-${index}-0)`}
        d={d1}
        strokeDasharray={`${length}, ${length}`}
        strokeDashoffset={strokeDashoffset1}
        {...{ strokeWidth }}
      />
      <AnimatedPath
        fill="none"
        stroke={`url(#angular-gradient-${index}-1)`}
        d={d2}
        strokeDasharray={`${length}, ${length}`}
        strokeDashoffset={strokeDashoffset2}
        {...{ strokeWidth }}
      />
    </>
  );
};
