import React from "react";
import { StyleSheet } from "react-native";
import Animated, { divide, sub } from "react-native-reanimated";

import { vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { Point as PointModel, SIZE, matrixVecMul } from "./ThreeDMath";

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

const Point = ({ x, y, z, theta }: PointProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);
  const vec4 = matrixVecMul(m, [x, y, z, 1]);
  // https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
  const perspective = divide(1, sub(2, vec4[2]));
  const tr = vec.multiply(
    SIZE,
    vec.multiply({ x: vec4[0], y: vec4[1] }, perspective)
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
