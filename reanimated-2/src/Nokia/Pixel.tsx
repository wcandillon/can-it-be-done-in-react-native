import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const { width } = Dimensions.get("window");
export const WIDTH = 5; //160 48x84
export const HEIGHT = 5; //116
const POINT = width / WIDTH;
const styles = StyleSheet.create({
  pixel: {
    width: POINT,
    height: POINT,
  },
});

const shader = (x: number, y: number): boolean => {
  "worklet";
  return x % 2 === 0 && y % 2 === 0;
};

interface PixelProps {
  x: number;
  y: number;
}

const Pixel = ({ x, y }: PixelProps) => {
  console.log({ x, y });
  const style = useAnimatedStyle(() => {
    const on = shader(x, y);
    return {
      backgroundColor: on ? "#303031" : "#7D8C73",
    };
  });
  return <Animated.View style={[styles.pixel, style]} />;
};

export default Pixel;
