import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { add, divide, multiply } from "react-native-reanimated";

import { StyleGuide } from "../components";
import { Vec4, processTransform } from "./Matrix4";

const { width } = Dimensions.get("window");
const size = 100;
const styles = StyleSheet.create({
  point: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.primary,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});
const canvas = (v: Animated.Node<number>) => add(width / 2, multiply(size, v));
const dot = (v: Animated.Adaptable<number>, vec: Vec4) =>
  add(
    multiply(v, vec[0]),
    multiply(v, vec[1]),
    multiply(v, vec[2]),
    multiply(v, vec[3])
  );

interface PointProps {
  x: number;
  y: number;
  z: number;
  theta: Animated.Node<number>;
}

const Point = ({ x, y, z, theta }: PointProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);
  const translateX = canvas(dot(x, m[0]));
  const translateY = canvas(dot(y, m[1]));
  return (
    <Animated.View
      style={[
        styles.point,
        {
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
};

export default Point;
