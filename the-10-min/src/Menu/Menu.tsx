import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { bInterpolate, timing } from "react-native-redash";
import Animated, {
  Value,
  block,
  cond,
  eq,
  set,
  useCode
} from "react-native-reanimated";
import Screen from "./Screen";
import Profile from "./Profile";
import { State, alpha } from "./Constants";

const { width } = Dimensions.get("window");
const perspective = { perspective: 1000 };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center"
  }
});

export default () => {
  const state = new Value(State.CLOSING);
  const transition = new Value(0);
  const rotateY = bInterpolate(transition, 0, -alpha);
  const scale = bInterpolate(transition, 1, 0.9);
  const opacity = bInterpolate(transition, 0, 0.5);
  useCode(
    () =>
      block([
        cond(eq(state, State.OPENING), [
          set(transition, timing({ from: 0, to: 1 }))
        ]),
        cond(eq(state, State.CLOSING), [
          set(transition, timing({ from: 1, to: 0 }))
        ])
      ]),
    [state, transition]
  );
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          transform: [
            perspective,
            { translateX: width / 2 },
            { rotateY },
            { translateX: -width / 2 },
            { scale }
          ]
        }}
      >
        <Screen {...{ state, transition }} />
        <Animated.View
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
            opacity
          }}
        />
      </Animated.View>
      <View style={styles.layer} pointerEvents="box-none">
        <Profile {...{ transition, state }} />
      </View>
    </View>
  );
};
