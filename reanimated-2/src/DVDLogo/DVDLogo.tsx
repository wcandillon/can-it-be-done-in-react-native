import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Logo, { LOGO_WIDTH, LOGO_HEIGHT } from "./Logo";
import { withBouncing } from "./withBouncing";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

const DVDLogo = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  useEffect(() => {
    translateX.value = withBouncing(width - LOGO_WIDTH);
    translateY.value = withBouncing(height - LOGO_HEIGHT);
  }, [translateX, translateY]);
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={style}>
        <Logo />
      </Animated.View>
    </View>
  );
};

export default DVDLogo;
