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
import { Matrix4, processTransform } from "./Matrix4";
import { Point, SIZE, matrixVecMul, vec3 } from "./ThreeDMath";
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

const point = (m: Matrix4, { x, y, z }: ReturnType<typeof vec3>) => {
  const pV = matrixVecMul(m, [x, y, z, 1]);
  const z1 = divide(DISTANCE, sub(pV[2], DISTANCE));
  return vec.create(multiply(pV[0], z1), multiply(pV[1], z1));
};

const canvas = {
  p1: vec.create(-SIZE / 2, -SIZE / 2),
  p2: vec.create(-SIZE / 2, SIZE / 2),
  p3: vec.create(SIZE / 2, -SIZE / 2),
  p4: vec.create(SIZE / 2, SIZE / 2),
};
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

  const p1 = point(m, points[0]);
  const p2 = point(m, points[1]);
  const p3 = point(m, points[2]);
  const p4 = point(m, points[3]);

  const shape2d = transform2d({
    canvas,
    projected: {
      p1,
      p2,
      p3,
      p4,
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
