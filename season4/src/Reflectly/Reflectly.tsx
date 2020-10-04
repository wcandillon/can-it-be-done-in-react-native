import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  move,
  serialize,
  parse,
  SVGCommand,
  mixPath,
  mix,
  mixColor,
} from "react-native-redash";
import Svg, { Circle, Path } from "react-native-svg";

import Tabbar from "./Tabbar";

export const curve = (c) => {
  "worklet";
  return {
    type: SVGCommand.CURVE as const,
    ...c,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 32,
    alignItems: "center",
  },
});
const Reflectly = () => {
  const open = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: mixColor(open.value, "#F5F7FE", "#BBC0CE"),
    };
  });
  return (
    <Animated.View style={[styles.container, style]}>
      <Tabbar open={open} />
    </Animated.View>
  );
};

export default Reflectly;
