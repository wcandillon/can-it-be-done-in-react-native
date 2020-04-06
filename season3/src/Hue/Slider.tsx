import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  diffClamp,
  divide,
  set,
  useCode
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { onGestureEvent, withOffset } from "react-native-redash";

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
  v: Animated.Value<number>;
  backgroundColor: Animated.Node<number>;
  backgroundWithoutValue: Animated.Node<number>;
}

export default ({
  v,
  backgroundColor,
  backgroundWithoutValue
}: SliderProps) => {
  const state = new Value(0);
  const translationX = new Value(0);
  const offset = new Value(upperBound);
  const gestureHandler = onGestureEvent({
    translationX,
    state
  });
  const translateX = diffClamp(
    withOffset(translationX, state, offset),
    0,
    upperBound
  );
  useCode(() => set(v, divide(translateX, upperBound)), [translateX, v]);
  return (
    <View>
      <Animated.View
        style={[styles.background, { backgroundColor: backgroundWithoutValue }]}
      />
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={[styles.cursor, { transform: [{ translateX }] }]}
          />
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
};
