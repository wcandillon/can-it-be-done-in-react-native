import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useValues, withTimingTransition } from "react-native-redash";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import TabHeader from "./TabHeader";

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const {
  interpolate,
  Extrapolate,
  useCode,
  cond,
  greaterThan,
  set,
  block
} = Animated;

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
  const [toggle] = useValues<0 | 1>([0], []);
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, { duration: 100 });
  const { top: paddingTop } = insets;
  const translateX = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: Extrapolate.CLAMP
  });
  const translateY = interpolate(y, {
    inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
      0
    ],
    extrapolateRight: Extrapolate.CLAMP
  });
  const opacity = transition;
  useCode(
    () =>
      block([
        cond(
          greaterThan(y, HEADER_IMAGE_HEIGHT),
          set(toggle, 1),
          set(toggle, 0)
        )
      ]),
    [toggle, y]
  );
  return (
    <Animated.View style={[styles.container, { paddingTop }]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: "white"
        }}
      />
      <View style={styles.header}>
        <Animated.View style={{ opacity: transition }}>
          <Icon name="arrow-left" size={ICON_SIZE} color="black" />
        </Animated.View>
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
      <TabHeader {...{ y, transition }} />
    </Animated.View>
  );
};
