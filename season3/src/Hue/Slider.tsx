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
import { clamp, onGestureEvent, withOffset } from "react-native-redash";

const { width } = Dimensions.get("window");
const SIZE = 30;
const upperBound = width - SIZE;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    borderRadius: SIZE / 2
  },
  cursor: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "white"
  }
});

interface SliderProps {
  v: Animated.Value<number>;
}

export default ({ v }: SliderProps) => {
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
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[styles.cursor, { transform: [{ translateX }] }]}
        />
      </PanGestureHandler>
    </View>
  );
};
