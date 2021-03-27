import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  canvas2Cartesian,
  cartesian2Canvas,
  Vector,
} from "react-native-redash";

import { approximates, dist, rotate } from "./Math";

export const { width } = Dimensions.get("window");
export const height = width;

const SIZE = 65;
export const WIDTH = SIZE; //160 48x84
export const HEIGHT = SIZE; //116
const WIDTH0 = WIDTH - 1;
const HEIGHT0 = HEIGHT - 1;
const CENTER = { x: WIDTH0 / 2, y: HEIGHT0 / 2 };
const POINT = Math.floor(width / SIZE);
const styles = StyleSheet.create({
  pixel: {
    width: POINT,
    height: POINT,
  },
});

const circle = (x: number, y: number): boolean => {
  "worklet";
  const RADIUS = 5;
  return dist({ x, y }, CENTER) <= RADIUS;
};

const ellipse = (
  x: number,
  y: number,
  a: number = WIDTH0 / 4,
  b: number = WIDTH0 / 2
): boolean => {
  "worklet";
  const x2 = (x - CENTER.x) ** 2;
  const y2 = (y - CENTER.y) ** 2;
  const a2 = a ** 2;
  const b2 = b ** 2;
  return approximates(y2 / b2 + x2 / a2, 1, 0.2);
};

interface PixelProps {
  x: number;
  y: number;
}

const Pixel = ({ x, y }: PixelProps) => {
  const style = useAnimatedStyle(() => {
    const r1 = cartesian2Canvas(
      rotate(canvas2Cartesian({ x, y }, CENTER), Math.PI / 3),
      CENTER
    );
    const r2 = cartesian2Canvas(
      rotate(canvas2Cartesian({ x, y }, CENTER), -Math.PI / 3),
      CENTER
    );
    return {
      backgroundColor:
        ellipse(x, y) ||
        circle(x, y) ||
        ellipse(r1.x, r1.y) ||
        ellipse(r2.x, r2.y)
          ? "#303031"
          : "#7D8C73",
    };
  });
  return <Animated.View style={[styles.pixel, style]} />;
};

export default Pixel;
