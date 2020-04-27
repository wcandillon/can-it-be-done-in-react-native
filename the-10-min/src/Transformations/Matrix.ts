import Animated, { tan } from "react-native-reanimated";
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

type Column4 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

type Row4 = Column4;
type Matrix4 = readonly [Column4, Column4, Column4, Column4];

type TransformName =
  | "translateX"
  | "translateY"
  | "translateZ"
  | "scale"
  | "scaleX"
  | "scaleY"
  | "skewX"
  | "skewY"
  | "rotateZ"
  | "rotate"
  | "perspective"
  | "rotateX"
  | "rotateY"
  | "rotateZ";
type Transformations = { [Name in TransformName]: Animated.Adaptable<number> };
export type Transforms = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "perspective">
  | Pick<Transformations, "rotateX">
  | Pick<Transformations, "rotateY">
  | Pick<Transformations, "rotateZ">
  | Pick<Transformations, "rotate">
)[];

const exhaustiveCheck = (a: never): never => {
  throw new Error(`Unexhaustive handling for ${a}`);
};

const identityMatrix: Matrix4 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateXMatrix = (x: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, x],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateYMatrix = (y: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [0, 1, 0, y],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateZMatrix = (z: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, z],
  [0, 0, 0, 1],
];

const scaleMatrix = (s: Animated.Adaptable<number>): Matrix4 => [
  [s, 0, 0, 0],
  [0, s, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const scaleXMatrix = (s: Animated.Adaptable<number>): Matrix4 => [
  [s, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const skewXMatrix = (s: Animated.Adaptable<number>): Matrix4 => [
  [1, tan(s), 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const skewYMatrix = (s: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [tan(s), 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const scaleYMatrix = (s: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [0, s, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const perspectiveMatrix = (p: Animated.Adaptable<number>): Matrix4 => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, divide(-1, p)],
];

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

const rotateZMatrix = (r: Animated.Adaptable<number>): Matrix4 => [
  [cos(r), multiply(-1, sin(r)), 0, 0],
  [sin(r), cos(r), 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

export const dot = (row: Row4, col: Column4) => {
  return add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2]),
    multiply(row[3], col[3])
  );
};

export const multiply4 = (m1: Matrix4, m2: Matrix4) => {
  const col0 = [m2[0][0], m2[1][0], m2[2][0], m2[3][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1], m2[3][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2], m2[3][2]] as const;
  const col3 = [m2[0][3], m2[1][3], m2[2][3], m2[3][3]] as const;
  return [
    [dot(m1[0], col0), dot(m1[0], col1), dot(m1[0], col2), dot(m1[0], col3)],
    [dot(m1[1], col0), dot(m1[1], col1), dot(m1[1], col2), dot(m1[1], col3)],
    [dot(m1[2], col0), dot(m1[2], col1), dot(m1[2], col2), dot(m1[2], col3)],
    [dot(m1[3], col0), dot(m1[3], col1), dot(m1[3], col2), dot(m1[3], col3)],
  ] as const;
};

// eslint-disable-next-line import/prefer-default-export
export const processTransform = (transforms: Transforms) =>
  transforms.reduce((acc, transform) => {
    const key = Object.keys(transform)[0] as TransformName;
    const value = (transform as Pick<Transformations, typeof key>)[key];
    if (key === "translateX") {
      return multiply4(acc, translateXMatrix(value));
    }
    if (key === "translateY") {
      return multiply4(acc, translateYMatrix(value));
    }
    if (key === "translateZ") {
      return multiply4(acc, translateZMatrix(value));
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
    if (key === "rotateX") {
      return multiply4(acc, rotateXMatrix(value));
    }
    if (key === "rotateY") {
      return multiply4(acc, rotateYMatrix(value));
    }
    if (key === "perspective") {
      return multiply4(acc, perspectiveMatrix(value));
    }
    if (key === "rotate" || key === "rotateZ") {
      return multiply4(acc, rotateZMatrix(value));
    }
    return exhaustiveCheck(key);
  }, identityMatrix);
// https://www.w3.org/TR/css-transforms-1/#decomposing-a-2d-matrix
// https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
// https://gist.github.com/Breton/9d217e0375de055d563b9a0b758d4ae6
export const decompose2d = (m: Matrix4) => {
  const a = m[0][0];
  const b = m[1][0];
  const c = m[0][1];
  const d = m[1][1];
  const translateX = m[0][3];
  const translateY = m[1][3];
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
