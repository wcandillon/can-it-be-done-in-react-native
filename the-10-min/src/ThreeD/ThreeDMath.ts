/* eslint-disable no-plusplus */
import { Dimensions } from "react-native";
import { Vector, vec } from "react-native-redash";

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
