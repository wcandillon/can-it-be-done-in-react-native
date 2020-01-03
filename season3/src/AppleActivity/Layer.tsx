import React from "react";
import { View } from "react-native";
import Animated, {
  cond,
  debug,
  greaterThan,
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

interface LayerProps {
  progress: Animated.Node<number>;
  color: string;
  size: number;
  opacity: number;
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
  return (
    <>
      {hasStartingLineCap && (
        <Circle cx={cx + r} cy={cy} r={STROKE_WIDTH / 2} fill={color} />
      )}
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
