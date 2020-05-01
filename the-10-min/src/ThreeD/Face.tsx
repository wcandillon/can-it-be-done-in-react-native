import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  debug,
  divide,
  multiply,
  sub,
  useCode,
} from "react-native-reanimated";
import { decompose2d, vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { DISTANCE, Point, SIZE, matrixVecMul, vec3 } from "./ThreeDMath";
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

  const p1V = matrixVecMul(m, [points[0].x, points[0].y, points[0].z, 1]);
  const z1 = divide(1, sub(DISTANCE, p1V[2]));
  const p1 = vec3(multiply(p1V[0], z1), multiply(p1V[1], z1), 1);

  const p2V = matrixVecMul(m, [points[1].x, points[1].y, points[1].z, 1]);
  const z2 = divide(1, sub(DISTANCE, p2V[2]));
  const p2 = vec3(multiply(p2V[0], z2), multiply(p2V[1], z2), 1);

  const p3V = matrixVecMul(m, [points[2].x, points[2].y, points[2].z, 1]);
  const z3 = divide(1, sub(DISTANCE, p3V[2]));
  const p3 = vec3(multiply(p3V[0], z3), multiply(p3V[1], z3), 1);

  const p4V = matrixVecMul(m, [points[3].x, points[3].y, points[3].z, 1]);
  const z4 = divide(1, sub(DISTANCE, p4V[2]));
  const p4 = vec3(multiply(p4V[0], z4), multiply(p4V[1], z4), 1);
  const shape2d = transform2d({
    p1: {
      o: vec.create(-SIZE / 2),
      p: vec.multiply(p1, SIZE),
    },
    p2: {
      o: vec.create(SIZE / 2, -SIZE / 2),
      p: vec.multiply(p2, SIZE),
    },
    p3: {
      o: vec.create(-SIZE / 2, SIZE / 2),
      p: vec.multiply(p3, SIZE),
    },
    p4: {
      o: vec.create(SIZE / 2),
      p: vec.multiply(p4, SIZE),
    },
  });
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
        opacity: 1,
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
