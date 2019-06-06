import * as React from "react";
import { StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

interface CheckIconProps {
  color: string;
  isActive: Animated.Value<0 | 1>;
}

const CHECK_ICON_SIZE = 35;

export default ({
  isActive: opacity,
  color: backgroundColor
}: CheckIconProps) => {
  return (
    <Animated.View style={[styles.container, { backgroundColor, opacity }]}>
      <Icon name="check" color="white" size={24} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CHECK_ICON_SIZE,
    height: CHECK_ICON_SIZE,
    borderRadius: CHECK_ICON_SIZE / 2,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center"
  }
});
