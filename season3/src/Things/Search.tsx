import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { clamp, interpolateColor } from "react-native-redash";
import { StyleGuide } from "../components";
import { frictionFactor } from "../components/AnimationHelpers";

const {
  Extrapolate,
  interpolate,
  divide,
  sub,
  multiply,
  max,
  call,
  useCode,
  cond,
  greaterOrEq
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
const CONTAINER_HEIGHT = 100;
const THRESHOLD = CONTAINER_HEIGHT + marginTop;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -CONTAINER_HEIGHT,
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
  const [search, setSearch] = useState(false);
  const chevronTranslateY = multiply(y, frictionFactor(divide(1, y)));
  const searchTranslateY = clamp(chevronTranslateY, 0, THRESHOLD);
  const backgroundColor = interpolateColor(y, {
    inputRange: [CONTAINER_HEIGHT, THRESHOLD],
    outputRange: [grey, primary]
  });
  const opacity = interpolate(y, {
    inputRange: [CONTAINER_HEIGHT, THRESHOLD],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });
  const oppositeOpacity = sub(1, opacity);
  useCode(cond(greaterOrEq(y, THRESHOLD), call([], () => setSearch(true))), []);
  return (
    <View style={styles.container}>
      {search && (
        <View
          style={{
            position: "absolute",
            top: CONTAINER_HEIGHT,
            left: 0,
            width: 100,
            height: 100,
            backgroundColor: "red"
          }}
        />
      )}
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
