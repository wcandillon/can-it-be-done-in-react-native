import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Logo, { LOGO_WIDTH, LOGO_HEIGHT } from "./Logo";
import { withBouncing } from "./withBouncing";

const { width, height } = Dimensions.get("window");
const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ff00ff",
  "#ffff00",
  "#00ffff",
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

const DVDLogo = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const color = useSharedValue(colors[0]);
  const onBounce = useCallback(() => {
    "worklet";
    const colorsLeft = colors.concat();
    colorsLeft.splice(colorsLeft.indexOf(color.value), 1);
    color.value =
      colorsLeft[Math.round(Math.random() * (colorsLeft.length - 1))];
  }, [color]);
  useEffect(() => {
    translateX.value = withBouncing(0, width - LOGO_WIDTH, onBounce);
    translateY.value = withBouncing(0, height - LOGO_HEIGHT, onBounce);
  }, [onBounce, translateX, translateY]);
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={style}>
        <Logo color={color} />
      </Animated.View>
    </View>
  );
};

export default DVDLogo;
