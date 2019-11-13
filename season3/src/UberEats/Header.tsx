import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import TabHeader from "./TabHeader";

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const { interpolate, Extrapolate } = Animated;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  header: {
    flexDirection: "row",
    height: MIN_HEADER_HEIGHT,
    alignItems: "center",
    paddingHorizontal: PADDING
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1
  }
});

interface HeaderProps {
  y: Animated.Value<number>;
}

export default ({ y }: HeaderProps) => {
  const insets = useSafeArea();
  const { top: paddingTop } = insets;
  const inputRange = [0, HEADER_IMAGE_HEIGHT];
  const translateX = interpolate(y, {
    inputRange,
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: Extrapolate.CLAMP
  });
  const translateY = interpolate(y, {
    inputRange,
    outputRange: [HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT, 0],
    extrapolateRight: Extrapolate.CLAMP
  });
  return (
    <Animated.View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Icon name="arrow-left" size={ICON_SIZE} color="white" />
        <Animated.Text
          style={[
            styles.title,
            { transform: [{ translateX }, { translateY }] }
          ]}
        >
          Miss Miu Europaallee
        </Animated.Text>
        <Icon name="heart" size={ICON_SIZE} color="white" />
      </View>
      <TabHeader />
    </Animated.View>
  );
};
