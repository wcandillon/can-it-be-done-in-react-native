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
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { clamp, useVector, getYForX, Path } from "react-native-redash";

import { SIZE } from "./Model";

const CURSOR = 50;
const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
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
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true;
    },
    onActive: (event) => {
      translation.x.value = event.x - CURSOR / 2;
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
      opacity: withTiming(isActive.value ? 1 : 0),
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.cursor, style]}>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cursor;
