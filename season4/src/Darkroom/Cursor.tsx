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

interface CursorProps {}

const Cursor = ({}: CursorProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.cursor]} />
    </View>
  );
};

export default Cursor;
