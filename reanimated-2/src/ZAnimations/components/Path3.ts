import { lerp } from "react-native-redash";

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

/**
 * PathCommand.prototype.arc = function( ctx, elem, renderer ) {
  var prev = this.previousPoint;
  var corner = this.renderPoints[0];
  var end = this.renderPoints[1];
  var cp0 = this.controlPoints[0];
  var cp1 = this.controlPoints[1];
  cp0.set( prev ).lerp( corner, arcHandleLength );
  cp1.set( end ).lerp( corner, arcHandleLength );
  return renderer.bezier( ctx, elem, cp0, cp1, end );
};*/

const lerp3 = (a: Vector3, b: Vector3, c: number) => {
  "worklet";
  return {
    x: (b.x - a.x) * c + a.x,
    y: (b.y - a.y) * c + a.y,
    z: (b.z - a.z) * c + a.z,
  };
};

/**
 * @summary Add an arc command to a path
 */
export const addArc3 = (path: Path3, corner: Vector3, to: Vector3) => {
  "worklet";
  const last = path.curves[path.curves.length - 1];
  const from = last ? last.to : path.move;
  path.curves.push({
    c1: lerp3(from, corner, 9 / 16),
    c2: lerp3(to, corner, 9 / 16),
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
