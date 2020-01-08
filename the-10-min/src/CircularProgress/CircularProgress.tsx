import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { bInterpolate } from "react-native-redash";

import { TAU } from "./Constants";
import HalfCircle from "./HalfCircle";

interface CircularProgressProps {
  progress: Animated.Node<number>;
}

export default ({ progress }: CircularProgressProps) => {
  const theta = bInterpolate(progress, 0, TAU);
  return (
    <View>
      <HalfCircle />
      <HalfCircle flipped />
    </View>
  );
};
