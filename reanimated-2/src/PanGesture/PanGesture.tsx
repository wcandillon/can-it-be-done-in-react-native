import React, { createContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Card, { Cards, CARD_WIDTH, CARD_HEIGHT } from "./Card";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { withDecay, clamp } from "../components/AnimatedHelpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface GestureProps {
  width: number;
  height: number;
}

const Gesture = ({ width, height }: GestureProps) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: ({ velocityX, velocityY }, ctx) => {
      translateX.value = withDecay({
        velocity: velocityX,
        clamp: [0, boundX],
      });
      translateY.value = withDecay({
        velocity: velocityY,
        clamp: [0, boundY],
      });
    },
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View {...{ style }}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Gesture;
