import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { divide, multiply, sub } from "react-native-reanimated";

import { vec } from "react-native-redash";
import { StyleGuide } from "../components";
import { processTransform } from "./Matrix4";
import {
  DISTANCE,
  Point as PointModel,
  SIZE,
  matrixVecMul,
  scaleToCanvas,
} from "./ThreeDMath";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  point: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.primary,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

interface PointProps extends PointModel {
  theta: Animated.Node<number>;
}

const Point = ({ x, y, z, theta }: PointProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);
  const vec4 = matrixVecMul(m, [x, y, z, 1]);
  const perspective = divide(1, sub(DISTANCE, vec4[2]));
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
