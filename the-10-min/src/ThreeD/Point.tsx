import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { add, divide, multiply } from "react-native-reanimated";

import { StyleGuide } from "../components";
import { Matrix4, Vec4, dot4, processTransform } from "./Matrix4";

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
const matrixVecMul = (m: Matrix4, v: Vec4) => [
  dot4(m[0], v),
  dot4(m[1], v),
  dot4(m[2], v),
  dot4(m[3], v),
];

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
  const vec4 = matrixVecMul(m, [x, y, z, 1]);
  const translateX = canvas(vec4[0]);
  const translateY = canvas(vec4[1]);
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
