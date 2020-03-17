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

import { onGestureEvent, timing, withTransition } from "react-native-redash";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EDFF",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const state = new Value(State.UNDETERMINED);
  const isActive = eq(state, State.BEGAN);
  const progress = withTransition(isActive, { duration: 2000 });
  const gestureHandler = onGestureEvent({ state });
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
