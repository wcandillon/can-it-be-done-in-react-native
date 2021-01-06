import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
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
    height: items.length * MAX_HEIGHT,
    backgroundColor: "black",
  },
});

const Channel = () => {
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value;
    },
  });
  return (
    <>
      <StatusBar hidden />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={MAX_HEIGHT}
      >
        <Animated.View style={styles.container}>
          {items.map((item, index) => (
            <Item item={item} key={index} y={y} index={index} />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
};

export default Channel;
