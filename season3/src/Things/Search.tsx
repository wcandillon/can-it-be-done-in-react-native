import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { clamp, interpolateColor } from "react-native-redash";
import { StyleGuide } from "../components";

const {
  Value,
  Extrapolate,
  interpolate,
  cond,
  lessOrEq,
  divide,
  sqrt,
  sub,
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
const marginTop = 32;
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
  const opacity = interpolate(y, {
    inputRange: [THRESHOLD, THRESHOLD + marginTop],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });
  const oppositeOpacity = sub(1, opacity);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.search,
          { backgroundColor, transform: [{ translateY: searchTranslateY }] }
        ]}
      >
        <Animated.View style={{ opacity }}>
          <Icon name="search" size={32} color="#babbc7" />
        </Animated.View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: oppositeOpacity,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Icon name="search" size={32} color="white" />
        </Animated.View>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: chevronTranslateY }] }}>
        <Animated.View style={{ opacity }}>
          <Icon name="chevron-down" size={32} color="#babbc7" />
        </Animated.View>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, opacity: oppositeOpacity }}
        >
          <Icon
            name="chevron-down"
            size={32}
            color={StyleGuide.palette.primary}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};
