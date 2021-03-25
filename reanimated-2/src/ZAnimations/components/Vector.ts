import { Matrix4, matrixVecMul4, Vector } from "react-native-redash";

import { Path3 } from "./Path3";

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export const project = (
  p: Vector3,
  canvas: Vector3,
  transform: Matrix4
): Vector3 => {
  "worklet";
  const pr = matrixVecMul4(transform, [p.x, p.y, p.z, 1]);
  return {
    x: ((pr[0] / pr[3]) * canvas.x) / 2,
    y: ((pr[1] / pr[3]) * canvas.y) / 2,
    z: ((pr[2] / pr[3]) * canvas.z) / 2,
  };
};

export const projectBezier = (
  path: Path3,
  canvas: Vector3,
  transform: Matrix4
) => {
  "worklet";
  return {
    move: project(path.move, canvas, transform),
    curves: path.curves.map((curve) => ({
      c1: project(curve.c1, canvas, transform),
      c2: project(curve.c2, canvas, transform),
      to: project(curve.to, canvas, transform),
    })),
    close: path.close,
  };
};

export const rotateZ = (v: Vector3, a: number): Vector3 => {
  "worklet";
  return {
    x: v.x * Math.cos(a) - v.y * Math.sin(a),
    y: v.x * Math.sin(a) + v.y * Math.cos(a),
    z: v.z,
  };
};

export const dist2d = (v: Vector) => {
  "worklet";
  return Math.sqrt(v.x ** 2 + v.y ** 2);
};
