import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { eq, contains } from "./Math";
import { Snake } from "./Snake";
export const { width } = Dimensions.get("window");
export const height = width;

const SIZE = 20;
export const RATIO = 1;
export const WIDTH = SIZE;
export const HEIGHT = Math.round(SIZE * RATIO);
const ON = "#303031";
const OFF = "#7D8C73";

const POINT = Math.floor(width / SIZE);
const styles = StyleSheet.create({
  pixel: {
    width: POINT,
    height: POINT,
  },
});

interface PixelProps {
  x: number;
  y: number;
  snake: Animated.SharedValue<Snake>;
}

const Pixel = ({ x, y, snake }: PixelProps) => {
  const style = useAnimatedStyle(() => {
    const on =
      eq({ x, y }, snake.value.food) || contains(snake.value.tail, { x, y });
    return {
      backgroundColor: on ? ON : OFF,
    };
  });
  return <Animated.View style={[styles.pixel, style]} />;
};

export default Pixel;
