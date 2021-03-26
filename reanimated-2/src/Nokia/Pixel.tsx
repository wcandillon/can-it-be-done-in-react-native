import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIZE = 8;
export const WIDTH = SIZE; //160 48x84
export const HEIGHT = SIZE; //116
const WIDTH0 = WIDTH - 1;
const HEIGHT0 = HEIGHT - 1;
const POINT = width / WIDTH;
const styles = StyleSheet.create({
  pixel: {
    width: POINT,
    height: POINT,
  },
});

const circle = (x2: number, y2: number): boolean => {
  "worklet";
  const x1 = WIDTH0 / 2;
  const y1 = HEIGHT0 / 2;
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return dist <= WIDTH0 / 2;
};

interface PixelProps {
  x: number;
  y: number;
}

const Pixel = ({ x, y }: PixelProps) => {
  const style = useAnimatedStyle(() => {
    const on = circle(x, y);
    return {
      backgroundColor: on ? "#303031" : "#7D8C73",
    };
  });
  return <Animated.View style={[styles.pixel, style]} />;
};

export default Pixel;
