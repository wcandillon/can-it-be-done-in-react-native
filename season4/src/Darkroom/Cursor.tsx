import React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

import { HEIGHT, PADDING } from "./Constants";

const SIZE = PADDING;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cursor: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "black",
  },
});

interface CursorProps {
  value: Animated.SharedValue<number>;
}

const Cursor = ({ value }: CursorProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offset: number }
  >({
    onStart: (_, ctx) => {
      ctx.offset = value.value;
    },
    onActive: ({ translationY }, ctx) => {
      value.value = clamp(ctx.offset + translationY / HEIGHT, 0, 1);
    },
  });
  const cursor = useAnimatedStyle(() => ({
    transform: [{ translateY: value.value * HEIGHT - SIZE / 2 }],
  }));
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.cursor, cursor]} />
      </PanGestureHandler>
    </View>
  );
};

export default Cursor;
