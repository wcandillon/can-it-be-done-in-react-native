import React from "react";
import Animated, { min } from "react-native-reanimated";
import { Ring, TAU } from "./Constants";
import CircularProgress from "./CircularProgress";

interface RingProps {
  ring: Ring;
  theta: Animated.Node<number>;
}

export default ({ ring, theta }: RingProps) => {
  return <CircularProgress theta={min(theta, TAU)} {...{ ring }} />;
};
