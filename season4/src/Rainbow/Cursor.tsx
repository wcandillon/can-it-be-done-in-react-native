import React from "react";
import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withDecay,
} from "react-native-reanimated";
import { clamp, useVector, getYForX, Path } from "react-native-redash";

import { SIZE } from "./Model";

const CURSOR = 100;
const styles = StyleSheet.create({
  cursorContainer: {
    width: CURSOR,
    height: CURSOR,
    justifyContent: "center",
    alignItems: "center",
  },
  cursor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 4,
    backgroundColor: "black",
  },
});

interface CursorProps {
  path: Animated.SharedValue<Path>;
}

const Cursor = ({ path }: CursorProps) => {
  const translation = useVector(100, 0);
  const onGestureEvent = useAnimatedGestureHandler<{
    offsetX: number;
    offsetY: number;
  }>({
    onStart: (_event, ctx) => {
      ctx.offsetX = translation.x.value;
      ctx.offsetY = translation.y.value;
    },
    onActive: (event, ctx) => {
      translation.x.value = clamp(ctx.offsetX + event.translationX, 0, SIZE);
      translation.y.value = getYForX(path.value, translation.x.value);
    },
    onEnd: ({ velocityX }) => {},
  });

  const style = useAnimatedStyle(() => {
    const translateX = translation.x.value - CURSOR / 2;
    const translateY = translation.y.value - CURSOR / 2;
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={[styles.cursorContainer, style]}>
          <View style={styles.cursor} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cursor;
