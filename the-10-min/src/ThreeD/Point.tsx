import React from "react";
import { StyleSheet } from "react-native";
import Animated, { divide, multiply, sub } from "react-native-reanimated";

import { vec } from "react-native-redash";
import { StyleGuide } from "../components";
import { processTransform } from "./Matrix4";
import {
  DISTANCE,
  Point as PointModel,
  SIZE,
  matrixVecMul,
} from "./ThreeDMath";

const styles = StyleSheet.create({
  point: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

interface PointProps extends PointModel {
  theta: Animated.Node<number>;
}

const scaleToCanvas = (
  x: Animated.Adaptable<number>,
  y: Animated.Adaptable<number>
) => vec.multiply(SIZE, vec.create(x, y));

const Point = ({ x, y, z, theta }: PointProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);
  const vec4 = matrixVecMul(m, [x, y, z, 1]);
  const perspective = divide(1, sub(2, vec4[2]));
  const tr = scaleToCanvas(
    multiply(vec4[0], perspective),
    multiply(vec4[1], perspective)
  );
  return (
    <Animated.View
      style={[
        styles.point,
        {
          opacity: 0.5,
          transform: [{ translateX: tr.x }, { translateY: tr.y }],
        },
      ]}
    />
  );
};

export default Point;
