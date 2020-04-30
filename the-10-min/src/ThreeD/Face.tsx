import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  add,
  debug,
  multiply,
  useCode,
} from "react-native-reanimated";
import { decompose2d, vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { Point, matrixVecMul, scaleToCanvas } from "./ThreeDMath";
import { transform2d } from "./Matrix3";

interface FaceProps {
  points: readonly [Point, Point, Point, Point];
  theta: Animated.Node<number>;
  backgroundColor: string;
}
export type Vec3 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

const { width } = Dimensions.get("window");

export type Matrix3 = readonly [Vec3, Vec3, Vec3];

const dot3 = (row: Vec3, col: Vec3) =>
  add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2])
  );

const mul3 = (m1: Matrix3, m2: Matrix3) => {
  const col0 = [m2[0][0], m2[1][0], m2[2][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2]] as const;
  return [
    [dot3(m1[0], col0), dot3(m1[0], col1), dot3(m1[0], col2)],
    [dot3(m1[1], col0), dot3(m1[1], col1), dot3(m1[1], col2)],
    [dot3(m1[2], col0), dot3(m1[2], col1), dot3(m1[2], col2)],
  ] as const;
};

const SIZE = 100;
const Face = ({ points, theta, backgroundColor }: FaceProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);

  const p1V = matrixVecMul(m, [points[0].x, points[0].y, points[0].z, 1]);
  const p1 = vec.create(p1V[0], p1V[1]);

  const p2V = matrixVecMul(m, [points[1].x, points[1].y, points[1].z, 1]);
  const p2 = vec.create(p2V[0], p2V[1]);

  const p3V = matrixVecMul(m, [points[2].x, points[2].y, points[2].z, 1]);
  const p3 = vec.create(p3V[0], p3V[1]);

  const p4V = matrixVecMul(m, [points[3].x, points[3].y, points[3].z, 1]);
  const p4 = vec.create(p4V[0], p4V[1]);

  const {
    translateX,
    translateY,
    rotateZ,
    skewX,
    scaleX,
    scaleY,
  } = decompose2d(
    mul3(transform2d(1, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y), [
      [SIZE, 0, 0],
      [0, SIZE, 0],
      [0, 0, 1],
    ])
  );

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        top: width / 2,
        left: width / 2,
        width: 1,
        height: 1,
        backgroundColor,
        transform: [
          { translateX },
          { translateY },
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
