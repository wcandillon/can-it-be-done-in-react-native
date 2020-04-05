import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  debug,
  diffClamp,
  divide,
  set,
  useCode
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  clamp,
  hsv2rgb,
  onGestureEvent,
  withOffset
} from "react-native-redash";

const { width } = Dimensions.get("window");
const SIZE = 30;
const upperBound = width - SIZE;
const styles = StyleSheet.create({
  container: {
    borderRadius: SIZE / 2
  },
  cursor: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "white"
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: SIZE / 2
  }
});

interface SliderProps {
  h: Animated.Node<number>;
  s: Animated.Node<number>;
  v: Animated.Node<number>;
  bg1: Animated.Node<number>;
  bg2: Animated.Node<number>;
}

export default ({ h, s, v, bg1, bg2 }: SliderProps) => {
  const bg = hsv2rgb(h, s, 1);
  const state = new Value(0);
  const translationX = new Value(0);
  const offset = new Value(upperBound);
  const gestureHandler = onGestureEvent({
    translationX,
    state
  });
  const translateX = clamp(
    withOffset(translationX, state, offset),
    0,
    upperBound
  );
  useCode(() => set(v, divide(translateX, upperBound)), [translateX, v]);
  return (
    <View>
      <Animated.View style={[styles.background, { backgroundColor: bg2 }]} />
      <Animated.View style={[styles.container, { backgroundColor: bg1 }]}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={[styles.cursor, { transform: [{ translateX }] }]}
          />
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
};
