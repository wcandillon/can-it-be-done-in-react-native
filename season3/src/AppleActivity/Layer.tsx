import React from "react";
import { View } from "react-native";
import Animated, { multiply, sub } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

export const STROKE_WIDTH = 40;
const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface LayerProps {
  progress: Animated.Node<number>;
  color: string;
  size: number;
}

export default ({ progress, color, size }: LayerProps) => {
  const r = (size - STROKE_WIDTH) / 2;
  const circumference = r * 2 * PI;
  const α = multiply(sub(1, progress), PI * 2);
  const strokeDashoffset = multiply(α, r);
  const cx = size / 2;
  const cy = size / 2;
  return (
    <AnimatedCircle
      stroke={color}
      fill="none"
      strokeDasharray={`${circumference}, ${circumference}`}
      strokeLinecap="round"
      strokeWidth={STROKE_WIDTH}
      {...{
        strokeDashoffset,
        cx,
        cy,
        r
      }}
    />
  );
};
