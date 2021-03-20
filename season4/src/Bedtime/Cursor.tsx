import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import { Circle } from "react-native-svg";

import { STROKE, R, CENTER } from "./Constants";

const r = STROKE / 2;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CursorProps {
  theta?: Animated.SharedValue<number>;
}

const Cursor = ({ theta }: CursorProps) => {
  const animatedProps = useAnimatedProps(() => {
    const { x, y } = polar2Canvas(
      { theta: theta ? theta.value : 0, radius: R },
      CENTER
    );
    return {
      cx: x,
      cy: y,
      r,
    };
  });
  return <AnimatedCircle animatedProps={animatedProps} fill="#FD9F07" />;
};

export default Cursor;
