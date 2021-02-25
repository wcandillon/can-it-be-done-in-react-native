import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";

import Item, { MAX_HEIGHT } from "./Item";
import { items } from "./Model";

const snapPoints = items.map((_, i) => -i * MAX_HEIGHT);
const minY = Math.min(...snapPoints);
const maxY = Math.max(...snapPoints);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

const Channel = () => {
  const y = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetY: number }
  >({
    onStart: (_, ctx) => {
      ctx.offsetY = y.value;
    },
    onActive: ({ translationY }, ctx) => {
      y.value = clamp(ctx.offsetY + translationY, minY, maxY);
    },
    onEnd: ({ velocityY }) => {
      const to = snapPoint(y.value, velocityY, snapPoints);
      y.value = withSpring(to, { overshootClamping: true });
    },
  });
  return (
    <>
      <StatusBar hidden />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.container}>
          {items.map((item, index) => (
            <Item item={item} key={index} y={y} index={index} />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Channel;
