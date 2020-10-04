import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import {
  move,
  serialize,
  parse,
  SVGCommand,
  mixPath,
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
    backgroundColor: "#C0C6D4",
    paddingTop: 32,
    alignItems: "center",
  },
});
const Reflectly = () => {
  return (
    <View style={styles.container}>
      <Tabbar />
    </View>
  );
};

export default Reflectly;
