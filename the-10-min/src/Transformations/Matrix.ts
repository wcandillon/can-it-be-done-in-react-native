import Animated, { greaterThan, tan } from "react-native-reanimated";
import { atan2 } from "react-native-redash";

const {
  and,
  add,
  cond,
  eq,
  multiply,
  sqrt,
  cos,
  sin,
  sub,
  lessThan,
  divide,
  greaterOrEq,
  atan,
  pow,
} = Animated;

type Column3 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

type Row3 = Column3;
type Matrix3 = readonly [Column3, Column3, Column3];

type TransformName =
  | "translateX"
  | "translateY"
  | "scale"
  | "scaleX"
  | "scaleY"
  | "rotateZ"
  | "rotate"
  | "skewX"
  | "skewY";
type Transformations = { [Name in TransformName]: Animated.Adaptable<number> };
export type Transforms = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "rotateZ">
  | Pick<Transformations, "rotate">
  | Pick<Transformations, "skewX">
  | Pick<Transformations, "skewY">
)[];

const exhaustiveCheck = (a: never): never => {
  throw new Error(`Unexhaustive handling for ${a}`);
};

const identityMatrix: Matrix3 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const translateXMatrix = (x: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, x],
  [0, 1, 0],
  [0, 0, 1],
];

const translateYMatrix = (y: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, 0],
  [0, 1, y],
  [0, 0, 1],
];

const scaleMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [s, 0, 0],
  [0, s, 0],
  [0, 0, 1],
];

const scaleXMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [s, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const scaleYMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, 0],
  [0, s, 0],
  [0, 0, 1],
];

const skewXMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [1, tan(s), 0],
  [0, 1, 0],
  [0, 0, 1],
];

const skewYMatrix = (s: Animated.Adaptable<number>): Matrix3 => [
  [1, 0, 0],
  [tan(s), 1, 0],
  [0, 0, 1],
];

/*
const rotateXMatrix = (r: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [0, cos(r), multiply(-1, sin(r)), 0],
  [0, sin(r), cos(r), 0],
  [0, 0, 0, 1],
];

const rotateYMatrix = (r: Animated.Adaptable<number>): Matrix4 => [
  [cos(r), 0, sin(r), 0],
  [0, 1, 0, 0],
  [multiply(-1, sin(r)), 0, cos(r), 0],
  [0, 0, 0, 1],
];
*/

const rotateZMatrix = (r: Animated.Adaptable<number>): Matrix3 => [
  [cos(r), multiply(-1, sin(r)), 0],
  [sin(r), cos(r), 0],
  [0, 0, 1],
];

const multiplyRowByCol = (row: Row3, col: Column3) => {
  return add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2])
  );
};

const multiply4 = (m1: Matrix3, m2: Matrix3) => {
  const col0 = [m2[0][0], m2[1][0], m2[2][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2]] as const;
  return [
    [
      multiplyRowByCol(m1[0], col0),
      multiplyRowByCol(m1[0], col1),
      multiplyRowByCol(m1[0], col2),
    ],
    [
      multiplyRowByCol(m1[1], col0),
      multiplyRowByCol(m1[1], col1),
      multiplyRowByCol(m1[1], col2),
    ],
    [
      multiplyRowByCol(m1[2], col0),
      multiplyRowByCol(m1[2], col1),
      multiplyRowByCol(m1[2], col2),
    ],
  ] as const;
};

// eslint-disable-next-line import/prefer-default-export
export const accumulatedTransform = (transforms: Transforms) => {
  const m = transforms.reduce((acc, transform) => {
    const key = Object.keys(transform)[0] as TransformName;
    const value = (transform as Pick<Transformations, typeof key>)[key];
    if (key === "translateX") {
      return multiply4(acc, translateXMatrix(value));
    }
    if (key === "translateY") {
      return multiply4(acc, translateYMatrix(value));
    }
    if (key === "scale") {
      return multiply4(acc, scaleMatrix(value));
    }
    if (key === "scaleX") {
      return multiply4(acc, scaleXMatrix(value));
    }
    if (key === "scaleY") {
      return multiply4(acc, scaleYMatrix(value));
    }
    if (key === "skewX") {
      return multiply4(acc, skewXMatrix(value));
    }
    if (key === "skewY") {
      return multiply4(acc, skewYMatrix(value));
    }
    if (key === "rotate" || key === "rotateZ") {
      return multiply4(acc, rotateZMatrix(value));
    }
    return exhaustiveCheck(key);
  }, identityMatrix);
  // https://www.w3.org/TR/css-transforms-1/#decomposing-a-2d-matrix
  // https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
  // https://gist.github.com/Breton/9d217e0375de055d563b9a0b758d4ae6
  const a = m[0][0];
  const b = m[1][0];
  const c = m[0][1];
  const d = m[1][1];
  const translateX = m[0][2];
  const translateY = m[1][2];
  const E = divide(add(a, d), 2);
  const F = divide(sub(a, d), 2);
  const G = divide(add(c, b), 2);
  const H = divide(sub(c, b), 2);
  const Q = sqrt(add(pow(E, 2), pow(H, 2)));
  const R = sqrt(add(pow(F, 2), pow(G, 2)));
  const scaleX = add(Q, R);
  const scaleY = sub(Q, R);
  const a1 = atan2(G, F);
  const a2 = atan2(H, E);
  const theta = divide(sub(a2, a1), 2);
  const phi = divide(add(a2, a1), 2);
  return {
    translateX,
    translateY,
    rotateZ: multiply(-1, phi),
    scaleX,
    scaleY,
    skewX: multiply(-1, theta),
  };
};
