import { Vector3 } from "./Vector";

export interface Curve3 {
  to: Vector3;
  c1: Vector3;
  c2: Vector3;
}

export type Path3 = {
  move: Vector3;
  curves: Curve3[];
  close: boolean;
};

/**
 * @summary Create a new path
 */
export const createPath3 = (move: Vector3): Path3 => {
  "worklet";
  return {
    move,
    curves: [],
    close: false,
  };
};

/**
 * @summary Add a cubic Bèzier curve command to a path.
 */
export const addCurve3 = (path: Path3, c: Curve3) => {
  "worklet";
  path.curves.push({
    c1: c.c1,
    c2: c.c2,
    to: c.to,
  });
};

export const addArcTo3 = (path: Path3, to: Vector3) => {
  "worklet";
  const corner = { x: 0, y: 0, z: 0 };
  addArc3(path, corner, to);
};

/**
 * @summary Add an arc command to a path
 */
const C = 0.551915024494;
export const addArc3 = (path: Path3, corner: Vector3, to: Vector3) => {
  "worklet";
  const last = path.curves[path.curves.length - 1];
  const from = last ? last.to : path.move;
  path.curves.push({
    c1: {
      x: (corner.x - from.x) * C + from.x,
      y: (corner.y - from.y) * C + from.y,
      z: (corner.z - from.z) * C + from.z,
    },
    c2: {
      x: (corner.x - to.x) * C + to.x,
      y: (corner.y - to.y) * C + to.y,
      z: (corner.z - to.z) * C + to.z,
    },
    to,
  });
};

export const addLine3 = (path: Path3, to: Vector3) => {
  "worklet";
  const last = path.curves[path.curves.length - 1];
  const from = last ? last.to : path.move;
  path.curves.push({
    c1: from,
    c2: to,
    to,
  });
};

export const addQuadraticCurve3 = (path: Path3, cp: Vector3, to: Vector3) => {
  "worklet";
  const last = path.curves[path.curves.length - 1];
  const from = last ? last.to : path.move;
  path.curves.push({
    c1: {
      x: from.x / 3 + (2 / 3) * cp.x,
      y: from.y / 3 + (2 / 3) * cp.y,
      z: from.z / 3 + (2 / 3) * cp.z,
    },
    c2: {
      x: to.x / 3 + (2 / 3) * cp.x,
      y: to.y / 3 + (2 / 3) * cp.y,
      z: to.z / 3 + (2 / 3) * cp.z,
    },
    to,
  });
};

/**
 * @summary Add a close command to a path.
 */
export const close3 = (path: Path3) => {
  "worklet";
  path.close = true;
};
