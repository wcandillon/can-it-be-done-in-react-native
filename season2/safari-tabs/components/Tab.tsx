import React, { useMemo } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";
import { translateZ, bInterpolate } from "react-native-redash";

import Content from "./Content";

export const OVERVIEW = -1;
const perspective = 1000;
const { height } = Dimensions.get("window");
const { multiply, sin, abs } = Animated;

export interface ITab {
  id: string;
  screen: number;
}

interface TabProps {
  tab: ITab;
  selectedTab: number;
  index: number;
  closeTab: () => void;
  selectTab: () => void;
  transition: Animated.Value<number>;
}

export default ({
  transition,
  tab,
  selectedTab,
  index,
  selectTab: onPress,
  closeTab
}: TabProps) => {
  const H = -height / 2;
  const margin = selectedTab === OVERVIEW ? 16 : 0;
  const position = index > selectedTab ? height : 0;
  const top = selectedTab === OVERVIEW ? index * 150 : position;
  const rotateX = useMemo(() => bInterpolate(transition, 0, -Math.PI / 6), [
    transition
  ]);
  const z = useMemo(() => multiply(H, sin(abs(rotateX))), [H, rotateX]);
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          height,
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
