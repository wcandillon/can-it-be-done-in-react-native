import React from "react";
import Animated, { min } from "react-native-reanimated";
import { Ring, TAU } from "./Constants";
import CircularProgress from "./CircularProgress";
import AngularGradient from "./AngularGradient";

interface RingProps {
  ring: Ring;
  theta: Animated.Node<number>;
}

export default ({ ring, theta }: RingProps) => {
  // const fg = <AngularGradient size={ring.size} />;
  return (
    <CircularProgress
      theta={min(theta, TAU)}
      bg={ring.bg}
      fg={ring.start}
      radius={ring.size / 2}
    />
  );
};
