import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  min
} from "react-native-reanimated";
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
    <AngularGradient size={ring.size} colors={[ring.end, ring.start]} />
  );
  const bg = <View style={{ backgroundColor: ring.bg, flex: 1 }} />;
  const rotate = interpolate(theta, {
    inputRange: [TAU, 2 * TAU],
    outputRange: [0, 2 * TAU],
    extrapolateLeft: Extrapolate.CLAMP
  });
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <CircularProgress
        theta={min(theta, TAU)}
        radius={ring.size / 2}
        {...{ fg, bg }}
      />
    </Animated.View>
  );
};
