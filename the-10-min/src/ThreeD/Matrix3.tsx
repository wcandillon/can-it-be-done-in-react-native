import { add, divide, multiply, sub } from "react-native-reanimated";

function adj(m) {
  // Compute the adjugate of m
  return [
    sub(multiply(m[4], m[8]), multiply(m[5], m[7])),
    sub(multiply(m[2], m[7]), multiply(m[1], m[8])),
    sub(multiply(m[1], m[5]), multiply(m[2], m[4])),
    sub(multiply(m[5], m[6]), multiply(m[3], m[8])),
    sub(multiply(m[0], m[8]), multiply(m[2], m[6])),
    sub(multiply(m[2], m[3]), multiply(m[0], m[5])),
    sub(multiply(m[3], m[7]), multiply(m[4], m[6])),
    sub(multiply(m[1], m[6]), multiply(m[0], m[7])),
    sub(multiply(m[0], m[4]), multiply(m[1], m[3])),
  ];
}
function multmm(a, b) {
  // multiply two matrices
  const c = Array(9);
  for (let i = 0; i != 3; ++i) {
    for (let j = 0; j != 3; ++j) {
      c[3 * i + j] = add(
        multiply(a[3 * i + 0], b[3 * 0 + j]),
        multiply(a[3 * i + 1], b[3 * 1 + j]),
        multiply(a[3 * i + 2], b[3 * 2 + j])
      );
    }
  }
  return c;
}
function multmv(m, v) {
  // multiply matrix and vector
  return [
    add(multiply(m[0], v[0]), multiply(m[1], v[1]), multiply(m[2], v[2])),
    add(multiply(m[3], v[0]), multiply(m[4], v[1]), multiply(m[5], v[2])),
    add(multiply(m[6], v[0]), multiply(m[7], v[1]), multiply(m[8], v[2])),
  ];
}

function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const v = multmv(adj(m), [x4, y4, 1]);
  return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

function general2DProjection(
  x1s,
  y1s,
  x1d,
  y1d,
  x2s,
  y2s,
  x2d,
  y2d,
  x3s,
  y3s,
  x3d,
  y3d,
  x4s,
  y4s,
  x4d,
  y4d
) {
  const s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
  const d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
  return multmm(d, adj(s));
}

// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
// https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
// http://jsfiddle.net/dFrHS/1/
export function transform2d(w, h, x1, y1, x2, y2, x3, y3, x4, y4) {
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
  for (let i = 0; i != 9; ++i) t[i] = divide(t[i], t[8]);
  return [
    [t[0], t[3], t[6]],
    [t[1], t[4], t[7]],
    [t[2], t[5], t[8]],
  ] as const;
}
