import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const { PI } = Math;
export const TAU = 2 * PI;
export const SIZE = width;
export const STROKE_WIDTH = 40;
export const CX = SIZE / 2;
export const CY = SIZE / 2;

type Color = string;

export interface Ring {
  start: Color;
  end: Color;
  bg: Color;
  theta: number;
  size: number;
}

export const R1: Ring = {
  start: "rgb(0, 217, 253)",
  end: "rgb(0, 255, 169)",
  bg: "rgb(0, 72, 77)",
  theta: 2.3 * TAU,
  size: SIZE - STROKE_WIDTH * 4
};

export const R2: Ring = {
  start: "rgb(153, 255, 0)",
  end: "rgb(216, 255, 1)",
  bg: "rgb(47, 78, 0)",
  theta: 0.6 * TAU,
  size: SIZE - STROKE_WIDTH * 2
};

export const R3: Ring = {
  start: "rgb(249, 18, 78)",
  end: "rgb(249, 56, 133)",
  bg: "rgb(50, 1, 14)",
  theta: 1.7 * TAU,
  size: SIZE
};
