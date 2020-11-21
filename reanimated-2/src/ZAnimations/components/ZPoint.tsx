import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Circle } from "react-native-svg";

import { Vector3 } from "./Vector";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface VertexProps {
  points: Animated.SharedValue<Vector3[]>;
  fill: string;
  index: number;
}

const ZPoint = ({ points, index, fill }: VertexProps) => {
  const animatedProps = useAnimatedProps(() => ({
    cx: points.value[index].x,
    cy: points.value[index].y,
  }));
  return <AnimatedCircle animatedProps={animatedProps} fill={fill} r={5} />;
};

export default ZPoint;
