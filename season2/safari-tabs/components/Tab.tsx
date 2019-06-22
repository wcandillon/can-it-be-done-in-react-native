import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { translateZ, runTiming } from "react-native-redash";

import Tap from "./Tap";
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
  selectedTab: Animated.Value<number>;
  index: number;
  closeTab: () => void;
}

export default ({
  tab,
  transition,
  selectedTab,
  index,
  closeTab
}: TabProps) => {
  const H = -height / 2;
  const rotateX = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, -Math.PI / 6]
  });
  const margin = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 16]
  });
  const z = multiply(H, sin(abs(rotateX)));
  const position = cond(greaterThan(index, selectedTab), height, 0);
  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [position, index * 150]
  });
  const toggle = new Value(0);
  const clock = new Clock();
  const timing = (toggle: Animated.Node<number>) =>
    runTiming(clock, toggle, {
      toValue: not(toggle),
      duration: 300,
      easing: Easing.linear
    });
  const onPress = [set(selectedTab, index), set(toggle, not(toggle))];
  useCode(set(transition, timing(toggle)), []);
  return (
    <Tap {...{ onPress }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          margin,
          transform: [
            { perspective },
            { translateY },
            { rotateX },
            translateZ(perspective, z)
          ]
        }}
      >
        <Content source={tab.screen} {...{ closeTab }} />
      </Animated.View>
    </Tap>
  );
};
