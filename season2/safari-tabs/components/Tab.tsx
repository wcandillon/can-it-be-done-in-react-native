import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { translateZ, runTiming } from "react-native-redash";

import Tap from "./Tap";

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
  eq,
  not
} = Animated;

export interface ITab {
  id: number;
  screen: number;
}

interface TabProps {
  tab: ITab;
  progress: Animated.Value<number>;
}

export default ({ tab, progress }: TabProps) => {
  const H = -height / 2;
  const rotateX = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, -Math.PI / 6]
  });
  const margin = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16]
  });
  const z = multiply(H, sin(abs(rotateX)));
  const toggle = new Value(0);
  const clock = new Clock();
  const timing = (toggle: Animated.Node<number>) =>
    runTiming(clock, toggle, {
      toValue: not(toggle),
      duration: 300,
      easing: Easing.linear
    });
  const onPress = set(toggle, not(toggle));
  useCode(set(progress, timing(toggle)), []);
  return (
    <Tap {...{ onPress }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          margin,
          transform: [{ perspective }, { rotateX }, translateZ(perspective, z)]
        }}
      >
        <Image source={tab.screen} style={styles.image} />
      </Animated.View>
    </Tap>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  }
});
