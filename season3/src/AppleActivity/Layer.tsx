import React from "react";
import Animated, {
  add,
  interpolate,
  multiply,
  not,
  sub
} from "react-native-reanimated";
import { Circle } from "react-native-svg";
import { between, polar2Canvas } from "react-native-redash";

import Ring from "./Ring";

export const STROKE_WIDTH = 40;
const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const inputRange = [0, PI / 2, PI, PI + PI / 2, 2 * PI];
const so = 4;

interface LayerProps {
  progress: Animated.Node<number>;
  size: number;
  index: number;
}

export default ({ progress, size, index }: LayerProps) => {
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
  const alpha = Math.acos(
    (r * r + r * r - STROKE_WIDTH * STROKE_WIDTH) / (2 * r * r)
  );

  return (
    <>
      <AnimatedCircle
        cx={add(x, shadowOffsetX)}
        cy={add(y, shadowOffsetY)}
        opacity={not(between(theta, 2 * PI - alpha, 2 * PI + alpha))}
        r={STROKE_WIDTH / 2}
        fill="url(#linecap-shadow)"
      />
      <Ring strokeWidth={STROKE_WIDTH} {...{ cx, cy, r, theta, index }} />
    </>
  );
};
