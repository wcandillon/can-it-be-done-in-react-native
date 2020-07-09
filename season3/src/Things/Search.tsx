import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { clamp, interpolateColor } from "react-native-redash";

import { StyleGuide } from "../components";

const { Extrapolate, interpolate, sub } = Animated;
const grey = "rgb(186, 187, 199)";
const primary = "rgb(56, 132, 225)";
const size = 48;
const marginTop = 32;
const CONTAINER_HEIGHT = 100;
export const THRESHOLD = CONTAINER_HEIGHT + marginTop;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -CONTAINER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    width: size,
    height: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface SearchProps {
  translateY: Animated.Value<number>;
}

export default memo(({ translateY }: SearchProps) => {
  const chevronTranslateY = translateY;
  const searchTranslateY = clamp(chevronTranslateY, 0, THRESHOLD);
  const backgroundColor = interpolateColor(translateY, {
    inputRange: [CONTAINER_HEIGHT, THRESHOLD],
    outputRange: [grey, primary],
  }) as Animated.Node<number>;
  const opacity = interpolate(translateY, {
    inputRange: [CONTAINER_HEIGHT, THRESHOLD],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const oppositeOpacity = sub(1, opacity);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.search,
          {
            backgroundColor,
            transform: [{ translateY: searchTranslateY }],
          },
        ]}
      >
        <Icon name="search" size={32} color="white" />
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
});
