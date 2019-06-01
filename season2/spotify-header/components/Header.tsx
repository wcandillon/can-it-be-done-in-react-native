import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";

interface HeaderProps {
  artist: string;
  y: Animated.Value<number>;
}

const {
  Extrapolate, interpolate,
} = Animated;

export default ({ artist, y }: HeaderProps) => {
  const backgroundOpacity = interpolate(y, {
    inputRange: [HEADER_DELTA - 32, HEADER_DELTA],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View style={[styles.container, { opacity: backgroundOpacity }]}>
      <Text style={styles.title}>{artist}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
