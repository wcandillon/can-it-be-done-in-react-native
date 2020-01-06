import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  max,
  min,
  multiply,
  sub
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { CX, CY, PI, Ring, SIZE, STROKE_WIDTH, TAU } from "./Constants";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CurtainProps {
  ring: Ring;
  revolution: Animated.Node<number>;
}

export default ({ ring, revolution }: CurtainProps) => {
  const r = (ring.size - STROKE_WIDTH) / 2;
  const circumference = r * TAU;
  const α = multiply(sub(1, revolution), TAU);
  const strokeDashoffset = sub(circumference, multiply(α, -r));
  return (
    <Svg width={SIZE} height={SIZE}>
      <AnimatedCircle
        cx={CX}
        cy={CY}
        fill="transparent"
        strokeWidth={STROKE_WIDTH}
        stroke={ring.bg}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ r, strokeDashoffset }}
      />
    </Svg>
  );
};
