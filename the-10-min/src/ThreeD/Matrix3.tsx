import Animated, { divide, multiply, sub } from "react-native-reanimated";
import {
  Matrix3,
  Vec3,
  Vector,
  matrixVecMul,
  multiply3,
} from "react-native-redash";

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

type FlatMatrix3 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

const flatten = (m: Matrix3) =>
  [
    m[0][0],
    m[0][1],
    m[0][2],
    m[1][0],
    m[1][1],
    m[1][2],
    m[2][0],
    m[2][1],
    m[2][2],
  ] as const;

const inflate = (m: FlatMatrix3) =>
  [
    [m[0], m[1], m[2]],
    [m[3], m[4], m[5]],
    [m[6], m[7], m[8]],
  ] as const;

const adjugate = (m: Matrix3) => {
  return [
    sub(multiply(m[1][1], m[2][2]), multiply(m[1][2], m[2][1])),
    sub(multiply(m[0][2], m[2][1]), multiply(m[0][1], m[2][2])),
    sub(multiply(m[0][1], m[1][2]), multiply(m[0][2], m[1][1])),
    sub(multiply(m[1][2], m[2][0]), multiply(m[1][0], m[2][2])),
    sub(multiply(m[0][0], m[2][2]), multiply(m[0][2], m[2][0])),
    sub(multiply(m[0][2], m[1][0]), multiply(m[0][0], m[1][2])),
    sub(multiply(m[1][0], m[2][1]), multiply(m[1][1], m[2][0])),
    sub(multiply(m[0][1], m[2][0]), multiply(m[0][0], m[2][1])),
    sub(multiply(m[0][0], m[1][1]), multiply(m[0][1], m[1][0])),
  ] as const;
};

const basisToPoints = ({ p1, p2, p3, p4 }: Quadrilateral) => {
  const m = inflate([p1.x, p2.x, p3.x, p1.y, p2.y, p3.y, 1, 1, 1]);
  const v = matrixVecMul(inflate(adjugate(m)), [p4.x, p4.y, 1]);
  return multiply3(m, inflate([v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]));
};

// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
// https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
// http://jsfiddle.net/dFrHS/1/
export const transform2d = (params: Parameters) => {
  const s = basisToPoints(params.canvas);
  const d = basisToPoints(params.projected);
  const t = flatten(multiply3(d, inflate(adjugate(s))));
  return [
    [divide(t[0], t[8]), divide(t[1], t[8]), divide(t[2], t[8])],
    [divide(t[3], t[8]), divide(t[4], t[8]), divide(t[5], t[8])],
    [divide(t[6], t[8]), divide(t[7], t[8]), 1],
  ] as const;
};
