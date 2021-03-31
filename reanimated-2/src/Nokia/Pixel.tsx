import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Snake } from "./Snake";

export const { width } = Dimensions.get("window");
export const height = width;

const SIZE = 40;
export const RATIO = 116 / 160;
export const WIDTH = SIZE;
export const HEIGHT = Math.round(SIZE * RATIO);
const CENTER = { x: (WIDTH - 1) / 2, y: (HEIGHT - 1) / 2 };
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
}

const Pixel = ({ x, y }: PixelProps) => {
  const style = useAnimatedStyle(() => {
    const on = false;
    return {
      backgroundColor: on ? OFF : ON,
    };
  });
  return <Animated.View style={[styles.pixel, style]} />;
};

export default Pixel;
