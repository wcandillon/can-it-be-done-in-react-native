import React from "react";
import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  Extrapolate,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  withDecay,
  useAnimatedReaction,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "black",
  },
});

interface CursorProps {
  path: Animated.SharedValue<Path>;
}

const Cursor = ({ path }: CursorProps) => {
  const translation = useVector();
  const isActive = useSharedValue(false);
  useAnimatedReaction(
    () => path.value,
    () => {
      translation.y.value = getYForX(path.value, translation.x.value);
    }
  );
  const onGestureEvent = useAnimatedGestureHandler<{
    offsetX: number;
    offsetY: number;
  }>({
    onStart: (_event, ctx) => {
      isActive.value = true;
      ctx.offsetX = translation.x.value;
      ctx.offsetY = translation.y.value;
    },
    onActive: (event, ctx) => {
      translation.x.value = clamp(ctx.offsetX + event.translationX, 0, SIZE);
      translation.y.value = getYForX(path.value, translation.x.value);
    },
    onEnd: () => {
      isActive.value = false;
    },
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
          <View style={styles.cursor}>
            <View style={styles.cursorBody} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cursor;
