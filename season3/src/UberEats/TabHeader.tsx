import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";

interface TabHeaderProps {
  transition: Animated.Value<number>;
  y: Animated.Value<number>;
}

export default ({ transition, y }: TabHeaderProps) => {
  const opacity = transition;
  return (
    <Animated.View style={{ height: 45, opacity }}>
      <Text>Hello</Text>
    </Animated.View>
  );
};
