import { add, divide, multiply, sub } from "react-native-reanimated";
import { Vector, vec } from "react-native-redash";

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

function basisToPoints({ p1, p2, p3, p4 }: Quadrilateral) {
  const m = [p1.x, p2.x, p3.x, p1.y, p2.y, p3.y, 1, 1, 1];
  const v = multmv(adj(m), [p4.x, p4.y, 1]);
  return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}

function general2DProjection(params: Parameters) {
  const s = basisToPoints(params.canvas);
  const d = basisToPoints(params.projected);
  return multmm(d, adj(s));
}

// https://math.stackexchange.com/questions/296794/finding-the-transform-matrix-from-4-projected-points-with-javascript
// https://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
// http://jsfiddle.net/dFrHS/1/
export const transform2d = (params: Parameters) => {
  const t = general2DProjection(params);
  return [
    [divide(t[0], t[8]), divide(t[1], t[8]), divide(t[2], t[8])],
    [divide(t[3], t[8]), divide(t[4], t[8]), divide(t[5], t[8])],
    [divide(t[6], t[8]), divide(t[7], t[8]), 1],
  ] as const;
};
