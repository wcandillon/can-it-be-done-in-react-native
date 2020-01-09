import React from "react";
import Animated, { min } from "react-native-reanimated";
import { View } from "react-native";
import { Ring, TAU } from "./Constants";
import CircularProgress from "./CircularProgress";
import AngularGradient from "./AngularGradient";

interface RingProps {
  ring: Ring;
  theta: Animated.Node<number>;
}

export default ({ ring, theta }: RingProps) => {
  const fg = (
    <AngularGradient size={ring.size} colors={[ring.start, ring.end]} />
  );
  const bg = <View style={{ backgroundColor: ring.bg, flex: 1 }} />;
  return (
    <CircularProgress
      theta={min(theta, TAU)}
      radius={ring.size / 2}
      {...{ fg, bg }}
    />
  );
};
