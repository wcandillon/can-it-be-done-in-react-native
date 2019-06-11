import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Animated from "react-native-reanimated";
import { interpolatePath } from "react-native-redash";

import Slider, { SEGMENT_WIDTH } from "./Slider";

export interface Phone {
  shape: string;
  screen: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface PhonesProps {
  phones: Phone[];
}

const { Value, interpolate } = Animated;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default ({ phones }: PhonesProps) => {
  const inputRange = phones.map((_, index) => SEGMENT_WIDTH * index);
  const slider = new Value(0);
  const x = interpolate(slider, {
    inputRange,
    outputRange: phones.map(phone => phone.screen.x)
  });
  const y = interpolate(slider, {
    inputRange,
    outputRange: phones.map(phone => phone.screen.y)
  });
  const width = interpolate(slider, {
    inputRange,
    outputRange: phones.map(phone => phone.screen.width)
  });
  const height = interpolate(slider, {
    inputRange,
    outputRange: phones.map(phone => phone.screen.height)
  });
  const d = interpolatePath(slider, {
    inputRange,
    outputRange: phones.map(phone => phone.shape)
  });
  return (
    <SafeAreaView style={styles.container}>
      <Svg style={styles.svg} viewBox="0 0 100 300">
        <AnimatedPath fill="black" {...{ d }} />
        <AnimatedRect fill="white" {...{ x, y, width, height }} />
      </Svg>
      <Slider {...{ phones, slider }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4ccadc"
  },
  svg: {
    flex: 1,
    aspectRatio: 1 / 3,
    alignSelf: "center",
    marginBottom: 200
  }
});
