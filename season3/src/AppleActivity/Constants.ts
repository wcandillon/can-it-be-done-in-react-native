import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");

export const { PI } = Math;
export const TAU = 2 * PI;
export const SIZE = width * PixelRatio.get();
export const STROKE_WIDTH = 40 * PixelRatio.get();
export const CX = SIZE / 2;
export const CY = SIZE / 2;

type Color = [number, number, number];

export interface Ring {
  start: Color;
  end: Color;
  bg: Color;
  value: number;
  size: number;
}

export const R1: Ring = {
  start: [0, 217, 253],
  end: [0, 255, 169],
  bg: [0, 72, 77],
  value: 2.3 * TAU,
  size: SIZE - STROKE_WIDTH * 4
};

export const R2: Ring = {
  start: [153, 255, 0],
  end: [216, 255, 1],
  bg: [47, 78, 0],
  value: 0.5 * TAU,
  size: SIZE - STROKE_WIDTH * 2
};

export const R3: Ring = {
  start: [249, 18, 78],
  end: [249, 56, 133],
  bg: [50, 1, 14],
  value: 1.7 * TAU,
  size: SIZE
};
