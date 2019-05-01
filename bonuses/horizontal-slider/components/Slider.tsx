import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { DangerZone } from "expo";

import Cursor from "./Cursor";

const { Animated } = DangerZone;
const { Value, max, add } = Animated;

const { width: totalWidth } = Dimensions.get("window");
const count = 10;
const width = totalWidth / count;
const height = width;

interface SliderProps {}

export default () => {
  const x = new Value(0);
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#bd536d",
          width: add(max(x, 0), height),
          height,
          borderRadius: height / 2,
        }}
      />
      <Cursor size={height} {...{ x, count }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: totalWidth,
    height,
    borderRadius: height / 2,
    backgroundColor: "#f1f2f6",
  },
});
