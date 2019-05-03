import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { DangerZone } from "expo";

import Cursor from "./Cursor";
import Labels from "./Labels";

const { Animated } = DangerZone;
const {
  Value, max, add, round, divide,
} = Animated;

const { width: totalWidth } = Dimensions.get("window");
const count = 5;
const width = totalWidth / count;
const height = width;

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
      <Labels size={height} {...{ x, count }} />
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
