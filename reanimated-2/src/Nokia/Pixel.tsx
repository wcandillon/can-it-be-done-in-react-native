import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const { width } = Dimensions.get("window");
export const WIDTH = 50; //160 48x84
export const HEIGHT = 50; //116
const POINT = width / WIDTH;
const styles = StyleSheet.create({
  pixel: {
    width: POINT,
    height: POINT,
  },
});

const circle = (x: number, y: number): boolean => {
  "worklet";
  const x1 = (WIDTH - 1) / 2;
  const y1 = (HEIGHT - 1) / 2;
  const x2 = x;
  const y2 = y;
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return dist <= (WIDTH - 1) / 2;
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
