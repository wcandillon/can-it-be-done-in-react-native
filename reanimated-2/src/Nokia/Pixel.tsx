import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  canvas2Cartesian,
  cartesian2Canvas,
  Vector,
} from "react-native-redash";

export const { width } = Dimensions.get("window");
export const height = width;

const SIZE = 32;
export const WIDTH = SIZE; //160 48x84
export const HEIGHT = SIZE; //116
const WIDTH0 = WIDTH - 1;
const HEIGHT0 = HEIGHT - 1;
const CENTER = { x: WIDTH0, y: HEIGHT0 };
const POINT = Math.floor(width / SIZE);
const styles = StyleSheet.create({
  pixel: {
    width: POINT,
    height: POINT,
  },
});

const circle = (x2: number, y2: number): boolean => {
  "worklet";
  const RADIUS = 2;
  const x1 = WIDTH0 / 2;
  const y1 = HEIGHT0 / 2;
  const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return dist <= RADIUS;
};

export const approximates = (a: number, b: number, precision = 0.001) => {
  "worklet";
  return Math.abs(a - b) < precision;
};

const ellipse = (
  x: number,
  y: number,
  a: number = WIDTH0 / 4,
  b: number = WIDTH0 / 2
): boolean => {
  "worklet";
  const h = WIDTH0 / 2;
  const k = WIDTH0 / 2;
  const x2 = (x - h) ** 2;
  const y2 = (y - k) ** 2;
  const a2 = a ** 2;
  const b2 = b ** 2;
  return approximates(y2 / b2 + x2 / a2, 1, 0.1);
};

interface PixelProps {
  x: number;
  y: number;
}

export const rotate = (tr: Vector, rotation: number) => {
  "worklet";
  return {
    x: tr.x * Math.cos(rotation) - tr.y * Math.sin(rotation),
    y: tr.x * Math.sin(rotation) + tr.y * Math.cos(rotation),
  };
};

const Pixel = ({ x, y }: PixelProps) => {
  const style = useAnimatedStyle(() => {
    const on = ellipse(x, y) || circle(x, y);
    return {
      backgroundColor: on ? "#303031" : "#7D8C73",
    };
  });
  return <Animated.View style={[styles.pixel, style]} />;
};

export default Pixel;
