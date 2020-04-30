import Animated, { add, divide, multiply, sub } from "react-native-reanimated";

type Vec3 = readonly [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

type Matrix3 = readonly [Vec3, Vec3, Vec3];

const dot3 = (row: Vec3, col: Vec3) =>
  add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2])
  );

export const matrixVecMul = (m: Matrix3, v: Vec3) => [
  dot3(m[0], v),
  dot3(m[1], v),
  dot3(m[2], v),
];

const mul3 = (m1: Matrix3, m2: Matrix3) => {
  const col0 = [m2[0][0], m2[1][0], m2[2][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2]] as const;
  return [
    [dot3(m1[0], col0), dot3(m1[0], col1), dot3(m1[0], col2)],
    [dot3(m1[1], col0), dot3(m1[1], col1), dot3(m1[1], col2)],
    [dot3(m1[2], col0), dot3(m1[2], col1), dot3(m1[2], col2)],
  ] as const;
};

const adj = (m: Matrix3) => {
  // Compute the adjugate of m
  return [
    [
      sub(multiply(m[1][1], m[2][2]), multiply(m[2][1], m[1][2])),
      sub(multiply(m[2][0], m[1][2]), multiply(m[1][0], m[2][2])),
      sub(multiply(m[2][0], m[2][1]), multiply(m[2][0], m[1][1])),
    ],
    [
      sub(multiply(m[2][1], m[0][2]), multiply(m[0][1], m[2][2])),
      sub(multiply(m[0][0], m[2][2]), multiply(m[2][0], m[0][2])),
      sub(multiply(m[2][0], m[0][1]), multiply(m[0][0], m[2][1])),
    ],
    [
      sub(multiply(m[0][1], m[1][2]), multiply(m[1][1], m[0][2])),
      sub(multiply(m[1][0], m[0][2]), multiply(m[0][0], m[1][2])),
      sub(multiply(m[0][0], m[1][1]), multiply(m[1][0], m[0][1])),
    ],
  ] as const;
};

const basisToPoints = (
  x1: Animated.Adaptable<number>,
  y1: Animated.Adaptable<number>,
  x2: Animated.Adaptable<number>,
  y2: Animated.Adaptable<number>,
  x3: Animated.Adaptable<number>,
  y3: Animated.Adaptable<number>,
  x4: Animated.Adaptable<number>,
  y4: Animated.Adaptable<number>
) => {
  const m = [
    [x1, y1, 1],
    [x2, y2, 1],
    [x3, y3, 1],
  ] as const;
  const v = matrixVecMul(adj(m), [x4, y4, 1]);
  return mul3(m, [
    [v[0], 0, 0],
    [0, v[1], 0],
    [0, 0, v[2]],
  ]);
};

function general2DProjection(
  x1s: Animated.Adaptable<number>,
  y1s: Animated.Adaptable<number>,
  x1d: Animated.Adaptable<number>,
  y1d: Animated.Adaptable<number>,
  x2s: Animated.Adaptable<number>,
  y2s: Animated.Adaptable<number>,
  x2d: Animated.Adaptable<number>,
  y2d: Animated.Adaptable<number>,
  x3s: Animated.Adaptable<number>,
  y3s: Animated.Adaptable<number>,
  x3d: Animated.Adaptable<number>,
  y3d: Animated.Adaptable<number>,
  x4s: Animated.Adaptable<number>,
  y4s: Animated.Adaptable<number>,
  x4d: Animated.Adaptable<number>,
  y4d: Animated.Adaptable<number>
) {
  const s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
  const d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
  return mul3(d, adj(s));
}

export const transform2d = (
  x1: Animated.Adaptable<number>,
  y1: Animated.Adaptable<number>,
  x2: Animated.Adaptable<number>,
  y2: Animated.Adaptable<number>,
  x3: Animated.Adaptable<number>,
  y3: Animated.Adaptable<number>,
  x4: Animated.Adaptable<number>,
  y4: Animated.Adaptable<number>
) => {
  const w = 100;
  const h = 100;
  const t = general2DProjection(
    0,
    0,
    x1,
    y1,
    w,
    0,
    x2,
    y2,
    0,
    h,
    x3,
    y3,
    w,
    h,
    x4,
    y4
  );
  return t;
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
    [
      divide(t[2][0], t[2][2]),
      divide(t[2][1], t[2][2]),
      divide(t[2][2], t[2][2]),
    ],
  ] as const;
};
