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

import Ring from "./Ring";

export const STROKE_WIDTH = 40;
const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const inputRange = [0, PI / 2, PI, PI + PI / 2, 2 * PI];
const so = 4;

interface LayerProps {
  progress: Animated.Node<number>;
  color: string;
  size: number;
  hasStartingLineCap: boolean;
  index: number;
}

export default ({
  hasStartingLineCap,
  progress,
  color,
  size,
  index
}: LayerProps) => {
  const r = (size - STROKE_WIDTH) / 2;
  const theta = multiply(sub(1, progress), PI * 2);
  const cx = size / 2;
  const cy = size / 2;
  const { x, y } = polar2Canvas({ theta, radius: r }, { x: cx, y: cy });
  const shadowOffsetX = interpolate(theta, {
    inputRange,
    outputRange: [0, so, 0, -so, 0]
  });
  const shadowOffsetY = interpolate(theta, {
    inputRange,
    outputRange: [so, 0, -so, 0, so]
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
      <Ring strokeWidth={STROKE_WIDTH} {...{ cx, cy, r, theta, index }} />
    </>
  );
};

/*

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
      */
