import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { add, debug, useCode } from "react-native-reanimated";
import { decompose2d, vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { Point, matrixVecMul, scaleToCanvas } from "./ThreeDMath";
import { transform2d } from "./Matrix3";
import { width } from "../Menu/Content";

interface FaceProps {
  points: readonly [Point, Point, Point, Point];
  theta: Animated.Node<number>;
  backgroundColor: string;
}

const SIZE = 100;
const Face = ({ points, theta, backgroundColor }: FaceProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);

  const p1V = matrixVecMul(m, [points[0].x, points[0].y, points[0].z, 1]);
  const p1 = vec.multiply(vec.create(p1V[0], p1V[1]), SIZE);

  const p2V = matrixVecMul(m, [points[1].x, points[1].y, points[1].z, 1]);
  const p2 = vec.multiply(vec.create(p2V[0], p2V[1]), SIZE);

  const p3V = matrixVecMul(m, [points[2].x, points[2].y, points[2].z, 1]);
  const p3 = vec.multiply(vec.create(p3V[0], p3V[1]), SIZE);

  const p4V = matrixVecMul(m, [points[3].x, points[3].y, points[3].z, 1]);
  const p4 = vec.multiply(vec.create(p4V[0], p4V[1]), SIZE);

  const {
    translateX,
    translateY,
    rotateZ,
    skewX,
    scaleX,
    scaleY,
  } = decompose2d(
    transform2d(SIZE, SIZE, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
  );

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        width: 100,
        height: 100,
        backgroundColor,
        transform: [
          { translateX: add(width / 2 + 2.5, translateX) },
          { translateY: add(width / 2 + 2.5, translateY) },
          { rotateZ: skewX },
          { scaleX },
          { scaleY },
          { rotateZ },
        ],
      }}
    />
  );
};

export default Face;
