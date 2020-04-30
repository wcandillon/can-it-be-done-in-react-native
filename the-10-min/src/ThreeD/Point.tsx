import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { vec } from "react-native-redash";
import { StyleGuide } from "../components";
import { processTransform } from "./Matrix4";
import { Point as PointModel, matrixVecMul, scaleToCanvas } from "./ThreeDMath";

const styles = StyleSheet.create({
  point: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: StyleGuide.palette.primary,
    top: -2.5,
    left: -2.5,
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
  const tr = scaleToCanvas(vec.create(vec4[0], vec4[1]));
  return (
    <Animated.View
      style={[
        styles.point,
        {
          transform: [{ translateX: tr.x }, { translateY: tr.y }],
        },
      ]}
    />
  );
};

export default Point;
