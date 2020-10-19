import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { Path } from "react-native-svg";

interface AnimatedStrokeProps {
  d: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedStroke = ({ d }: AnimatedStrokeProps) => {
  return <AnimatedPath d={d} stroke="black" strokeWidth={10} />;
};

export default AnimatedStroke;
