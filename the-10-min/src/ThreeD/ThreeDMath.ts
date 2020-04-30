import { Dimensions } from "react-native";
import { Vector, vec } from "react-native-redash";
import Animated, { add, multiply } from "react-native-reanimated";
import { Matrix4, Vec4, dot4 } from "./Matrix4";

export interface Point {
  x: number;
  y: number;
  z: number;
}

const { width } = Dimensions.get("window");
const size = 100;

export const scaleToCanvas = (v: Vector) =>
  vec.add(width / 2, vec.multiply(size, v));

export const matrixVecMul = (m: Matrix4, v: Vec4) => [
  dot4(m[0], v),
  dot4(m[1], v),
  dot4(m[2], v),
  dot4(m[3], v),
];

export const dot8 = (row: Vec8, col: Vec8) => {
  return add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2]),
    multiply(row[3], col[3]),
    multiply(row[4], col[4]),
    multiply(row[5], col[5]),
    multiply(row[6], col[6]),
    multiply(row[7], col[7])
  );
};

export const matrixVecMul8 = (m: Matrix8, v: Vec8) => [
  dot8(m[0], v),
  dot8(m[1], v),
  dot8(m[2], v),
  dot8(m[3], v),
  dot8(m[4], v),
  dot8(m[5], v),
  dot8(m[6], v),
  dot8(m[7], v),
];

export type Vec8 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

export type Matrix8 = readonly [Vec8, Vec8, Vec8, Vec8, Vec8, Vec8, Vec8, Vec8];

export const solve = (
  p1: Vector,
  p2: Vector,
  p3: Vector,
  p4: Vector,
  uv1: Vector,
  uv2: Vector,
  uv3: Vector,
  uv4: Vector
) => {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const { x: x3, y: y3 } = p3;
  const { x: x4, y: y4 } = p4;
  const { x: u1, y: v1 } = uv1;
  const { x: u2, y: v2 } = uv2;
  const { x: u3, y: v3 } = uv3;
  const { x: u4, y: v4 } = uv4;
  const a: Matrix8 = [
    [x1, y1, 1, 0, 0, 0, multiply(-1, x1, u1), multiply(-1, y1, u1)],
    [0, 0, 0, x1, y1, 1, multiply(-1, x1, v1), multiply(-1, y1, v1)],
    [x2, y2, 1, 0, 0, 0, multiply(-1, x2, u2), multiply(-1, y2, u2)],
    [0, 0, 0, x2, y2, 1, multiply(-1, x2, v2), multiply(-1, y2, v2)],
    [x3, y3, 1, 0, 0, 0, multiply(-1, x3, u3), multiply(-1, y3, u3)],
    [0, 0, 0, x3, y3, 1, multiply(-1, x3, v3), multiply(-1, y3, v3)],
    [x4, y4, 1, 0, 0, 0, multiply(-1, x4, u4), multiply(-1, y4, u4)],
    [0, 0, 0, x4, y4, 1, multiply(-1, x4, v4), multiply(-y4, v4)],
  ];
  const b: Vec8 = [u1, v1, u2, v2, u3, v3, u4, v4];
  const aInversed = inverse(a);
  return matrixVecMul8(aInversed, b);
};

/*
			//solve aH=b
			var a_inv = a.inverse();
			var H = a_inv.multiply(b);
			return H;
}
*/
