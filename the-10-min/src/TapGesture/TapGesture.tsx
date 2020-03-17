import React from "react";
import { StyleSheet, View } from "react-native";
import {
  LongPressGestureHandler,
  State,
  TapGestureHandler
} from "react-native-gesture-handler";
import Animated, {
  Clock,
  Extrapolate,
  Value,
  add,
  block,
  clockRunning,
  cond,
  debug,
  eq,
  interpolate,
  not,
  set,
  startClock,
  stopClock,
  useCode
} from "react-native-reanimated";

import { onGestureEvent } from "react-native-redash";
import Button from "./Button";

const DURATION = 5000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EDFF",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const time = new Value(0);
  const clock = new Clock();
  const progress = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state });
  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), set(time, clock)),
        cond(eq(state, State.BEGAN), startClock(clock)),
        cond(eq(state, State.END), stopClock(clock)),
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, DURATION)],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP
          })
        )
      ]),
    [clock, progress, state, time]
  );
  return (
    <View style={styles.container}>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View>
          <Button {...{ progress }} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};
