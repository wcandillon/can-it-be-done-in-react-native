import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  add,
  debug,
  divide,
  multiply,
  useCode,
} from "react-native-reanimated";
import {
  Vector,
  decompose2d,
  multiply3,
  translate,
  vec,
} from "react-native-redash";
import { Matrix4, multiply4, processTransform } from "./Matrix4";
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

const { width, height } = Dimensions.get("window");
const DISTANCE = 600;

const avg = (
  ...v: [
    Animated.Adaptable<number>,
    Animated.Adaptable<number>,
    ...Animated.Adaptable<number>[]
  ]
) => divide(add(...v), v.length);

const createPerspective = (
  fovInRadians: number,
  aspect: number,
  near: number,
  far: number
) => {
  const h = 1 / Math.tan(fovInRadians / 2);
  const rDepth = 1 / (near - far);
  const C = (far + near) * rDepth;
  const D = 2 * (far * near * rDepth);
  return [
    [h / aspect, 0, 0, 0],
    [0, h, 0, 0],
    [0, 0, C, D],
    [0, 0, -1, 0],
  ] as const;
};

const point = (m: Matrix4, p: ReturnType<typeof vec3>) => {
  const [x, y, z] = matrixVecMul(m, [p.x, p.y, p.z, 1]);
  return { x, y, z };
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
  const transform = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    // { rotateZ: theta },
  ]);

  const eyeZ = 1;
  const perspective = createPerspective(Math.PI / 2, 1, eyeZ / 10, eyeZ * 10);
  const m = multiply4(transform, perspective);

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
          opacity: 1,
          justifyContent: "center",
          alignItems: "center",
          width: SIZE,
          height: SIZE,
          top: -SIZE / 2,
          left: -SIZE / 2,
          backgroundColor,
          zIndex: add(500, avg(p1.z, p2.z, p3.z, p4.z)),
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
