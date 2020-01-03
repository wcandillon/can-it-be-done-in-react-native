import React from "react";
import { View } from "react-native";
import Animated, {
  add,
  cond,
  debug,
  greaterThan,
  interpolate,
  multiply,
  neq,
  not,
  sub,
  useCode
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { polar2Canvas } from "react-native-redash";

export const STROKE_WIDTH = 40;
const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const shadowOffset = 4;

interface LayerProps {
  progress: Animated.Node<number>;
  color: string;
  size: number;
  hasStartingLineCap: boolean;
}

export default ({ hasStartingLineCap, progress, color, size }: LayerProps) => {
  const r = (size - STROKE_WIDTH) / 2;
  const circumference = r * 2 * PI;
  const theta = multiply(sub(1, progress), PI * 2);
  const strokeDashoffset = multiply(theta, r);
  const cx = size / 2;
  const cy = size / 2;
  const { x, y } = polar2Canvas({ theta, radius: r }, { x: cx, y: cy });
  const shadowOffsetX = interpolate(theta, {
    inputRange: [0, PI / 2, PI, PI + PI / 2, 2 * PI],
    outputRange: [0, 4, 0, -4, 0]
  });
  const shadowOffsetY = interpolate(theta, {
    inputRange: [0, PI / 2, PI, PI + PI / 2, 2 * PI],
    outputRange: [4, 0, -4, 0, 4]
  });
  return (
    <>
      {hasStartingLineCap && (
        <Circle cx={cx + r} cy={cy} r={STROKE_WIDTH / 2} fill={color} />
      )}
      <AnimatedCircle
        cx={add(x, shadowOffsetX)}
        cy={add(y, shadowOffsetY)}
        opacity={neq(theta, 2 * PI)}
        r={STROKE_WIDTH / 2}
        fill="url(#linecap-shadow)"
      />
      <AnimatedCircle
        cx={x}
        cy={y}
        opacity={neq(theta, 2 * PI)}
        r={STROKE_WIDTH / 2}
        fill={color}
      />
      <AnimatedCircle
        stroke={color}
        fill="none"
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeWidth={STROKE_WIDTH}
        {...{
          strokeDashoffset,
          cx,
          cy,
          r
        }}
      />
    </>
  );
};
