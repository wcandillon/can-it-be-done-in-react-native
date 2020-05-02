import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  add,
  debug,
  divide,
  multiply,
  sub,
  useCode,
} from "react-native-reanimated";
import { Vector, decompose2d, translate, vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { Point, SIZE, matrixVecMul } from "./ThreeDMath";
import { transform2d } from "./Matrix3";
import { StyleGuide } from "../components";

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

export type Matrix3 = readonly [Vec3, Vec3, Vec3];

interface PointProps {
  point: Vector;
}

const PointComp = ({ point }: PointProps) => (
  <Animated.View
    style={[
      {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: StyleGuide.palette.primary,
        height: 10,
        width: 10,
        borderRadius: 5,
        opacity: 0.5,
        transform: translate(point),
      },
    ]}
  />
);

const DISTANCE = 600;
const Face = ({
  points: ogpoints,
  theta,
  backgroundColor,
  label,
}: FaceProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);
  const points = ogpoints.map((o) => ({
    x: multiply(o.x, SIZE),
    y: multiply(o.y, SIZE),
    z: multiply(o.z, SIZE),
  }));
  const p1V = matrixVecMul(m, [points[0].x, points[0].y, points[0].z, 1]);
  const z1 = divide(DISTANCE, sub(p1V[2], DISTANCE));
  const p1 = vec.create(multiply(p1V[0], z1), multiply(p1V[1], z1));

  const p2V = matrixVecMul(m, [points[1].x, points[1].y, points[1].z, 1]);
  const z2 = divide(DISTANCE, sub(p2V[2], DISTANCE));
  const p2 = vec.create(multiply(p2V[0], z2), multiply(p2V[1], z2));

  const p3V = matrixVecMul(m, [points[2].x, points[2].y, points[2].z, 1]);
  const z3 = divide(DISTANCE, sub(p3V[2], DISTANCE));
  const p3 = vec.create(multiply(p3V[0], z3), multiply(p3V[1], z3));

  const p4V = matrixVecMul(m, [points[3].x, points[3].y, points[3].z, 1]);
  const z4 = divide(DISTANCE, sub(p4V[2], DISTANCE));
  const p4 = vec.create(multiply(p4V[0], z4), multiply(p4V[1], z4));

  const shape2d = transform2d({
    p1: {
      o: vec.create(-SIZE / 2, -SIZE / 2),
      p: p1,
    },
    p2: {
      o: vec.create(-SIZE / 2, SIZE / 2),
      p: p2,
    },
    p3: {
      o: vec.create(SIZE / 2, -SIZE / 2),
      p: p3,
    },
    p4: {
      o: vec.create(SIZE / 2, SIZE / 2),
      p: p4,
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
    <>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: 0.61,
          justifyContent: "center",
          alignItems: "center",
          width: SIZE,
          height: SIZE,
          top: -SIZE / 2,
          left: -SIZE / 2,
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
      <PointComp point={p1} />
      <PointComp point={p2} />
      <PointComp point={p3} />
      <PointComp point={p4} />
    </>
  );
};

export default Face;

/*
   
      */
