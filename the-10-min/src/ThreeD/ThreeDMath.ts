/* eslint-disable no-plusplus */
import { Dimensions } from "react-native";
import { vec } from "react-native-redash";

import Animated from "react-native-reanimated";
import { Matrix4, Vec4, dot4 } from "./Matrix4";

export interface Point {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export const SIZE = 200;
export const DISTANCE = SIZE * 2;

export const matrixVecMul = (m: Matrix4, v: Vec4) =>
  [dot4(m[0], v), dot4(m[1], v), dot4(m[2], v), dot4(m[3], v)] as const;

export const vec3 = (
  x: Animated.Adaptable<number>,
  y: Animated.Adaptable<number>,
  z: Animated.Adaptable<number>
) => ({ x, y, z });
