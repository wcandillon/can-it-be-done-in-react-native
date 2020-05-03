import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { add, divide, multiply } from "react-native-reanimated";
import { decompose2d, vec } from "react-native-redash";
import {
  Matrix4,
  matrixVecMul4,
  multiply4,
  processTransform3d,
} from "./Matrix4";
import { Point, SIZE, transform2d, vec3 } from "./ThreeDMath";

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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
  const [x, y, z] = matrixVecMul4(m, [p.x, p.y, p.z, 1]);
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
  const transform = processTransform3d([
    { rotateY: theta },
    { rotateX: theta },
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
    <Animated.View
      style={[styles.container, { zIndex: avg(p1.z, p2.z, p3.z, p4.z) }]}
    >
      <Animated.View
        style={{
          opacity: 1,
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
    </Animated.View>
  );
};

export default Face;
