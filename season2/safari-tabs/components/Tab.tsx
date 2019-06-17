import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { translateZ, runTiming } from "react-native-redash";

import Tap from "./Tap";

const perspective = 1000;
const { height } = Dimensions.get("window");
const { Clock, multiply, sin, abs, interpolate, set } = Animated;

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
    outputRange: [0, -Math.PI / 6.67]
  });
  const z = multiply(H, sin(abs(rotateX)));

  const clock = new Clock();
  const onPress = set(
    progress,
    runTiming(clock, 1, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear
    })
  );
  return (
    <Tap {...{ onPress }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
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
    margin: 16,
    borderRadius: 8,
    resizeMode: "contain"
  }
});
