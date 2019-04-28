import React from "react";
import { StyleSheet, View } from "react-native";
import { DangerZone } from "expo";

import CircularProgress from "./components/CircularProgress";
import { runTiming } from "./components/AnimationHelpers";

const { Animated, Easing } = DangerZone;
const { Value, Clock, set } = Animated;

export default () => {
  const clock = new Clock();
  const progress = new Value(0);
  const config = {
    duration: 10 * 1000,
    toValue: new Value(1),
    easing: Easing.linear,
  };
  return (
    <>
      <Animated.Code>
        {
          () => set(progress, runTiming(clock, 0, config))
        }
      </Animated.Code>
      <View style={styles.container}>
        <CircularProgress {...{ progress }} />
      </View>
    </>
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
