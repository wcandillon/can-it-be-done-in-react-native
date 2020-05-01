import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  debug,
  divide,
  multiply,
  useCode,
} from "react-native-reanimated";
import { decompose2d, vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { Point, SIZE, matrixVecMul } from "./ThreeDMath";
import { transform2d } from "./Matrix3";

interface FaceProps {
  points: readonly [Point, Point, Point, Point];
  theta: Animated.Node<number>;
  backgroundColor: string;
  label: string;
}
export type Vec3 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

const { width } = Dimensions.get("window");

export type Matrix3 = readonly [Vec3, Vec3, Vec3];

const Face = ({ points, theta, backgroundColor, label }: FaceProps) => {
  const m = processTransform([
    //   { perspective: 4 },
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);
  const d = 4;
  const p1V = matrixVecMul(m, [points[0].x, points[0].y, points[0].z, 1]);
  const z1 = 1; // divide(d, p1V[2]);
  const p1 = vec.create(multiply(p1V[0], z1), multiply(p1V[1], z1));

  const p2V = matrixVecMul(m, [points[1].x, points[1].y, points[1].z, 1]);
  const z2 = 1; // divide(d, p2V[2]);
  const p2 = vec.create(multiply(p2V[0], z2), multiply(p2V[1], z2));

  const p3V = matrixVecMul(m, [points[2].x, points[2].y, points[2].z, 1]);
  const z3 = 1; // divide(d, p3V[2]);
  const p3 = vec.create(multiply(p3V[0], z3), multiply(p3V[1], z3));

  const p4V = matrixVecMul(m, [points[3].x, points[3].y, points[3].z, 1]);
  const z4 = 1; // divide(d, p4V[2]);
  const p4 = vec.create(multiply(p4V[0], z4), multiply(p4V[1], z4));

  const shape2d = transform2d(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  const {
    translateX,
    translateY,
    rotateZ,
    skewX,
    scaleX,
    scaleY,
  } = decompose2d(shape2d);

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: 0,
        justifyContent: "center",
        alignItems: "center",
        top: width / 2 - SIZE / 2,
        left: width / 2 - SIZE / 2,
        width: SIZE,
        height: SIZE,
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
    >
      <Text style={{ color: "white", fontSize: 16 }}>{label}</Text>
    </Animated.View>
  );
};

export default Face;
