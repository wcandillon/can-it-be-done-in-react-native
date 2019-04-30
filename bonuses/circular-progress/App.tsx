import React from "react";
import { StyleSheet, View } from "react-native";
import { DangerZone } from "expo";

import CircularProgress2 from "./components/CircularProgress2";
import { runTiming } from "./components/AnimationHelpers";

const { Animated, Easing } = DangerZone;
const { Value, Clock, set } = Animated;

export default () => {
  const clock = new Clock();
  const config = {
    duration: 10 * 1000,
    toValue: 1,
    easing: Easing.linear,
  };
  return (
    <View style={styles.container}>
      <CircularProgress2 progress={runTiming(clock, 0, config)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
