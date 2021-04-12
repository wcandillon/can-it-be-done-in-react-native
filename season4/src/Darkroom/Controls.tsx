import React from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { clamp, serialize, Path as RNPath } from "react-native-redash";
import Svg, { Line, Path } from "react-native-svg";

import { HEIGHT, PADDING, WIDTH } from "./Constants";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);

const STROKE = 1;

interface CursorProps {
  path: Animated.DerivedValue<RNPath>;
}

const Controls = ({ path }: CursorProps) => {
  const STEPS = path.value.curves.length;
  const STEP = WIDTH / STEPS;
  const animatedProps = useAnimatedProps(() => {
    return {
      d: serialize(path.value),
    };
  });
  return (
    <Svg width={width} height={HEIGHT}>
      {Array.from({ length: STEPS + 1 })
        .fill(0)
        .map((_, i) => {
          const x = PADDING + clamp(STEP * i, STROKE / 2, WIDTH - STROKE / 2);
          return (
            <Line
              key={i}
              x1={x}
              y1={0}
              x2={x}
              y2={HEIGHT}
              stroke="white"
              strokeWidth={STROKE}
            />
          );
        })}
      <AnimatedPath
        animatedProps={animatedProps}
        stroke="white"
        strokeWidth={STROKE}
      />
    </Svg>
  );
};

export default Controls;
