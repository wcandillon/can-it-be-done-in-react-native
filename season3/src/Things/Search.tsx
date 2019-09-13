import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { clamp, interpolateColor } from "react-native-redash";

const {
  Value,
  Extrapolate,
  interpolate,
  cond,
  lessOrEq,
  divide,
  sqrt,
  useCode,
  debug,
  multiply,
  add
} = Animated;
const grey = {
  r: 186,
  g: 187,
  b: 199
};
const primary = {
  r: 56,
  g: 132,
  b: 255
};
const size = 48;
const marginTop = 64;
const THRESHOLD = 100;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -THRESHOLD,
    justifyContent: "center",
    alignItems: "center"
  },
  search: {
    width: size,
    height: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface SearchProps {
  y: Animated.Value<number>;
}

export default ({ y }: SearchProps) => {
  const chevronTranslateY = divide(multiply(y, 8), sqrt(y));
  const searchTranslateY = clamp(chevronTranslateY, 0, THRESHOLD + marginTop);
  const backgroundColor = interpolateColor(y, {
    inputRange: [THRESHOLD, THRESHOLD + marginTop],
    outputRange: [grey, primary]
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.search,
          { backgroundColor, transform: [{ translateY: searchTranslateY }] }
        ]}
      >
        <Icon name="search" size={32} color="red" />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: chevronTranslateY }] }}>
        <Icon name="chevron-down" size={32} color="red" />
      </Animated.View>
    </View>
  );
};
