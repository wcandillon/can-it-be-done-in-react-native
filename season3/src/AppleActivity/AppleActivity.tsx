import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { timing } from "react-native-redash";

import CircularProgress, { STROKE_WIDTH } from "./CircularProgress";

const { Value, useCode, set, interpolate, Extrapolate } = Animated;
const { width } = Dimensions.get("window");
const s1 = width - 64;
const s2 = s1 - STROKE_WIDTH * 2;
const s3 = s2 - STROKE_WIDTH * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000001"
  }
});

export default () => {
  const progress = new Value(0);
  useCode(() => set(progress, timing({ duration: 4000 })), [progress]);
  const p1 = interpolate(progress, {
    inputRange: [0, 0.3],
    outputRange: [0, 0.3],
    extrapolate: Extrapolate.CLAMP
  });
  const p2 = interpolate(progress, {
    inputRange: [0, 0.5],
    outputRange: [0, 0.5],
    extrapolate: Extrapolate.CLAMP
  });
  const p3 = interpolate(progress, {
    inputRange: [0, 0.8],
    outputRange: [0, 0.8],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <View style={styles.container}>
      <CircularProgress
        size={s1}
        color="#DF0B18"
        progress={p1}
        icon="chevron-right"
      />
      <CircularProgress
        size={s2}
        color="#48E101"
        progress={p2}
        icon="chevrons-right"
      />
      <CircularProgress
        size={s3}
        color="#00C3DD"
        progress={p3}
        icon="chevron-up"
      />
    </View>
  );
};
