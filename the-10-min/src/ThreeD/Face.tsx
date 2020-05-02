import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  debug,
  divide,
  multiply,
  sub,
  useCode,
} from "react-native-reanimated";
import { Vector, decompose2d, translate, vec } from "react-native-redash";
import { processTransform } from "./Matrix4";
import { DISTANCE, Point, SIZE, matrixVecMul } from "./ThreeDMath";
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

const Face = ({ points, theta, backgroundColor, label }: FaceProps) => {
  const m = processTransform([
    { rotateY: theta },
    { rotateX: theta },
    { rotateZ: theta },
  ]);

  const p1V = matrixVecMul(m, [points[0].x, points[0].y, points[0].z, 1]);
  const z1 = divide(1, sub(DISTANCE, p1V[2]));
  const p1 = vec.create(multiply(p1V[0], z1, SIZE), multiply(p1V[1], z1, SIZE));

  const p2V = matrixVecMul(m, [points[1].x, points[1].y, points[1].z, 1]);
  const z2 = divide(1, sub(DISTANCE, p2V[2]));
  const p2 = vec.create(multiply(p2V[0], z2, SIZE), multiply(p2V[1], z2, SIZE));

  const p3V = matrixVecMul(m, [points[2].x, points[2].y, points[2].z, 1]);
  const z3 = divide(1, sub(DISTANCE, p3V[2]));
  const p3 = vec.create(multiply(p3V[0], z3, SIZE), multiply(p3V[1], z3, SIZE));

  const p4V = matrixVecMul(m, [points[3].x, points[3].y, points[3].z, 1]);
  const z4 = divide(1, sub(DISTANCE, p4V[2]));
  const p4 = vec.create(multiply(p4V[0], z4, SIZE), multiply(p4V[1], z4, SIZE));
  /*
  const vec4 = matrixVecMul(m, [x, y, z, 1]);
  const perspective = divide(1, sub(DISTANCE, vec4[2]));
  const tr = scaleToCanvas(
    multiply(vec4[0], perspective),
    multiply(vec4[1], perspective)
  );
  */
  const shape2d = transform2d(
    {
      p1: {
        o: vec.multiply(points[0], SIZE),
        p: p1,
      },
      p2: {
        o: vec.multiply(points[1], SIZE),
        p: p2,
      },
      p3: {
        o: vec.multiply(points[2], SIZE),
        p: p3,
      },
      p4: {
        o: vec.multiply(points[3], SIZE),
        p: p4,
      },
    },
    SIZE
  );

  const {
    translateX,
    translateY,
    rotateZ,
    skewX,
    scaleX,
    scaleY,
  } = decompose2d(shape2d);
  /*
  useCode(
    () => [
      debug("p1.x", multiply(p1.x, SIZE)),
      debug("p1.y", multiply(p1.y, SIZE)),
      debug("p2.x", multiply(p2.x, SIZE)),
      debug("p2.y", multiply(p2.y, SIZE)),
      debug("p3.x", multiply(p1.x, SIZE)),
      debug("p3.y", multiply(p1.y, SIZE)),
      debug("p4.x", multiply(p1.x, SIZE)),
      debug("p4.y", multiply(p1.y, SIZE)),
    ],
    []
  );
  */
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
