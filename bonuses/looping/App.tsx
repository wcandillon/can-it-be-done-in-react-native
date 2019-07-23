import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { loop, bInterpolate, runTiming } from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import Logo from "./components/Logo";

const {
  Value,
  Clock,
  useCode,
  set,
  block,
  cond,
  and,
  not,
  clockRunning,
  startClock,
  stopClock
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function App() {
  const [play, setPlay] = useState(false);
  const { isPlaying, animation, clock } = useMemoOne(
    () => ({
      isPlaying: new Value(0),
      animation: new Value(0),
      clock: new Clock()
    }),
    []
  );
  useCode(
    block([
      cond(and(not(clockRunning(clock)), isPlaying), startClock(clock)),
      cond(and(clockRunning(clock), not(isPlaying)), stopClock(clock)),
      set(
        animation,
        loop({
          clock,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: false
        })
      )
    ]),
    []
  );
  const scale = bInterpolate(animation, 0.4, 1);
  const rotate = bInterpolate(animation, 0, 2 * Math.PI * 5);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setPlay(!play);
        isPlaying.setValue(play ? 0 : 1);
      }}
    >
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale }, { rotate }] }}>
          <Logo />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
