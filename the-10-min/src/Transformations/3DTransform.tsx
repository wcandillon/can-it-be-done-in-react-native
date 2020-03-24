import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Value, cond, eq } from "react-native-reanimated";

import { onGestureEvent, timing } from "react-native-redash";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import Face, { CARD_HEIGHT, CARD_WIDTH } from "./components/Face";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

export default () => {
  const scaleRaw = new Value(1);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ scale: scaleRaw, state });
  const scale = cond(
    eq(state, State.END),
    timing({ from: scaleRaw, to: 1 }),
    scaleRaw
  );
  return (
    <PinchGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        <View style={styles.card}>
          <Face isOnTop {...{ scale }} />
          <Face {...{ scale }} />
        </View>
      </Animated.View>
    </PinchGestureHandler>
  );
};
