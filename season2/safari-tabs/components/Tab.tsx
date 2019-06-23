import * as React from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { translateZ, runTiming } from "react-native-redash";

import Content from "./Content";

export const OVERVIEW = -1;
const perspective = 1000;
const { height } = Dimensions.get("window");
const {
  Value,
  useCode,
  Clock,
  multiply,
  sin,
  abs,
  interpolate,
  set,
  cond,
  greaterThan,
  not
} = Animated;

export interface ITab {
  id: number;
  screen: number;
}

interface TabProps {
  tab: ITab;
  transition: Animated.Value<number>;
  selectedTab: number;
  index: number;
  closeTab: () => void;
  selectTab: () => void;
}

export default ({
  tab,
  transition,
  selectedTab,
  index,
  selectTab: onPress,
  closeTab
}: TabProps) => {
  const H = -height / 2;
  const rotateX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, -Math.PI / 6]
  });
  const margin = selectedTab === OVERVIEW ? 16 : 0;
  const z = multiply(H, sin(abs(rotateX)));
  const position = index > selectedTab ? height : 0;
  const top = selectedTab === OVERVIEW ? index * 150 : position;
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          margin,
          top,
          transform: [{ perspective }, { rotateX }, translateZ(perspective, z)]
        }}
      >
        <Content source={tab.screen} {...{ closeTab }} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
