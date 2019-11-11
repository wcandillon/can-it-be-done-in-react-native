import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export const backgroundImage = require("./assets/background.jpeg");

interface HeaderImageProps {
  x: Animated.Value<number>;
}

export default ({ x }: HeaderImageProps) => {
  return <View />;
};
