import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Snake } from "./Snake";

export const { width } = Dimensions.get("window");
export const height = width;

const SIZE = 20;
export const WIDTH = SIZE; //160 48x84
export const HEIGHT = SIZE; //116
const WIDTH0 = WIDTH - 1;
const HEIGHT0 = HEIGHT - 1;
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
      snake.value.tail.filter((v) => v.x === x && v.y === y).length !== 0 ||
      (snake.value.food.x === x && snake.value.food.y === y);
    return {
      backgroundColor: on ? "#303031" : "#7D8C73",
    };
  });
  return <Animated.View style={[styles.pixel, style]} />;
};

export default Pixel;
