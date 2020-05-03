/* eslint-disable no-plusplus */

import Animated, { divide, multiply, sub } from "react-native-reanimated";
import { Matrix3, Vector, matrixVecMul, multiply3 } from "react-native-redash";
import { Matrix4, Vec4, dot4 } from "./Matrix4";

export interface Point {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export const SIZE = 200;
export const DISTANCE = 600;

export const matrixVecMul4 = (m: Matrix4, v: Vec4) =>
  [dot4(m[0], v), dot4(m[1], v), dot4(m[2], v), dot4(m[3], v)] as const;

export const vec3 = (
  x: Animated.Adaptable<number>,
  y: Animated.Adaptable<number>,
  z: Animated.Adaptable<number>
) => ({ x, y, z });

interface Quadrilateral {
  p1: Vector;
  p2: Vector;
  p3: Vector;
  p4: Vector;
}

interface Parameters {
  canvas: Quadrilateral;
  projected: Quadrilateral;
}

const adjugate = (m: Matrix3) => {
  return [
    [
      sub(multiply(m[1][1], m[2][2]), multiply(m[1][2], m[2][1])),
      sub(multiply(m[0][2], m[2][1]), multiply(m[0][1], m[2][2])),
      sub(multiply(m[0][1], m[1][2]), multiply(m[0][2], m[1][1])),
    ],
    [
      sub(multiply(m[1][2], m[2][0]), multiply(m[1][0], m[2][2])),
      sub(multiply(m[0][0], m[2][2]), multiply(m[0][2], m[2][0])),
      sub(multiply(m[0][2], m[1][0]), multiply(m[0][0], m[1][2])),
    ],
    [
      sub(multiply(m[1][0], m[2][1]), multiply(m[1][1], m[2][0])),
      sub(multiply(m[0][1], m[2][0]), multiply(m[0][0], m[2][1])),
      sub(multiply(m[0][0], m[1][1]), multiply(m[0][1], m[1][0])),
    ],
  ] as const;
};

const basisToPoints = ({ p1, p2, p3, p4 }: Quadrilateral) => {
  const m = [
    [p1.x, p2.x, p3.x],
    [p1.y, p2.y, p3.y],
    [1, 1, 1],
  ] as const;
  const v = matrixVecMul(adjugate(m), [p4.x, p4.y, 1]);
  return multiply3(m, [
    [v[0], 0, 0],
    [0, v[1], 0],
    [0, 0, v[2]],
  ]);
};

// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
// https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
// http://jsfiddle.net/dFrHS/1/
export const transform2d = (params: Parameters) => {
  const s = basisToPoints(params.canvas);
  const d = basisToPoints(params.projected);
  const t = multiply3(d, adjugate(s));
  return [
    [
      divide(t[0][0], t[2][2]),
      divide(t[0][1], t[2][2]),
      divide(t[0][2], t[2][2]),
    ],
    [
      divide(t[1][0], t[2][2]),
      divide(t[1][1], t[2][2]),
      divide(t[1][2], t[2][2]),
    ],
    [divide(t[2][0], t[2][2]), divide(t[2][1], t[2][2]), 1],
  ] as const;
};
