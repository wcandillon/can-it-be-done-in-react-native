import { Vector } from "react-native-redash";

export const approximates = (a: number, b: number, precision = 0.001) => {
  "worklet";
  return Math.abs(a - b) < precision;
};

export const dist = (v1: Vector, v2: Vector) => {
  "worklet";
  return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
};

export const rotate = (tr: Vector, rotation: number) => {
  "worklet";
  return {
    x: Math.round(tr.x * Math.cos(rotation) - tr.y * Math.sin(rotation)),
    y: Math.round(tr.x * Math.sin(rotation) + tr.y * Math.cos(rotation)),
  };
};

export const randomVector = (maxX: number, maxY: number) => {
  "worklet";
  return {
    x: Math.round(Math.random() * maxX),
    y: Math.round(Math.random() * maxY),
  };
};

export const eq = (a: Vector, b: Vector) => {
  "worklet";
  return a.x === b.x && a.y === b.y;
};

export const contains = (vecs: Vector[], vec: Vector) => {
  "worklet";
  return vecs.filter((v) => eq(v, vec)).length > 0;
};
