/* eslint-disable no-bitwise */
import { Platform } from "react-native";
import {
  interpolate,
  Extrapolate,
  processColor,
} from "react-native-reanimated";

import { clamp, fract, mix } from "./Math";

export type Color = string | number;
export enum ColorSpace {
  RGB,
  HSV,
}

export const opacity = (c: number) => {
  "worklet";
  return ((c >> 24) & 255) / 255;
};

export const red = (c: number) => {
  "worklet";
  return (c >> 16) & 255;
};

export const green = (c: number) => {
  "worklet";
  return (c >> 8) & 255;
};

export const blue = (c: number) => {
  "worklet";
  return c & 255;
};

const color = (r: number, g: number, b: number, alpha = 1) => {
  "worklet";
  const a = Math.round(alpha * 255);
  const result =
    ((a * 1) << 24) +
    ((Math.round(r) * 1) << 16) +
    ((Math.round(g) * 1) << 8) +
    Math.round(b);
  if (Platform.OS === "android") {
    // on Android color is represented as signed 32 bit int
    return result < (1 << 31) >>> 0 ? color : result - Math.pow(2, 32);
  }
  return result;
};

export const hsv2rgb = (h: number, s: number, v: number) => {
  // vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  const K = {
    x: 1,
    y: 2 / 3,
    z: 1 / 3,
    w: 3,
  };
  // vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  const p = {
    x: Math.abs(fract(h + K.x) * 6 - K.w),
    y: Math.abs(fract(h + K.y) * 6 - K.w),
    z: Math.abs(fract(h + K.z) * 6 - K.w),
  };
  // return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  const rgb = {
    x: v * mix(s, K.x, clamp(p.x - K.x, 0, 1)),
    y: v * mix(s, K.x, clamp(p.y - K.x, 0, 1)),
    z: v * mix(s, K.x, clamp(p.z - K.x, 0, 1)),
  };
  return {
    r: Math.round(rgb.x * 255),
    g: Math.round(rgb.y * 255),
    b: Math.round(rgb.z * 255),
  };
};

export const hsv2color = (h: number, s: number, v: number) => {
  const { r, g, b } = hsv2rgb(h, s, v);
  return color(r, g, b);
};

export const colorForBackground = (r: number, g: number, b: number) => {
  "worklet";
  const L = 0.299 * r + 0.587 * g + 0.114 * b;
  return L > 186 ? 0x000000ff : 0xffffffff;
};

const rgbToHsv = (c: number) => {
  const r = red(c) / 255;
  const g = green(c) / 255;
  const b = blue(c) / 255;

  const ma = Math.max(r, g, b);
  const mi = Math.min(r, g, b);
  let h = 0;
  const v = ma;

  const d = ma - mi;
  const s = ma === 0 ? 0 : d / ma;
  if (ma === mi) {
    h = 0; // achromatic
  } else {
    switch (ma) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default: // do nothing
    }
    h /= 6;
  }
  return { h, s, v };
};

const interpolateColorsHSV = (
  value: number,
  inputRange: number[],
  colors: number[]
) => {
  "worklet";
  const colorsAsHSV = colors.map((c) => rgbToHsv(c));
  const h = interpolate(
    value,
    inputRange,
    colorsAsHSV.map((c) => c.h),
    Extrapolate.CLAMP
  );
  const s = interpolate(
    value,
    inputRange,
    colorsAsHSV.map((c) => c.s),
    Extrapolate.CLAMP
  );
  const v = interpolate(
    value,
    inputRange,
    colorsAsHSV.map((c) => c.v),
    Extrapolate.CLAMP
  );
  return hsv2color(h, s, v);
};

const interpolateColorsRGB = (
  value: number,
  inputRange: number[],
  colors: number[]
) => {
  "worklet";
  const r = Math.round(
    interpolate(
      value,
      inputRange,
      colors.map((c) => red(c)),
      Extrapolate.CLAMP
    )
  );

  const g = Math.round(
    interpolate(
      value,
      inputRange,
      colors.map((c) => green(c)),
      Extrapolate.CLAMP
    )
  );
  const b = Math.round(
    interpolate(
      value,
      inputRange,
      colors.map((c) => blue(c)),
      Extrapolate.CLAMP
    )
  );
  const a = interpolate(
    value,
    inputRange,
    colors.map((c) => opacity(c)),
    Extrapolate.CLAMP
  );
  console.log({ r, g, b, a });
  return color(r, g, b, a);
};

export const interpolateColor = (
  value: number,
  inputRange: number[],
  rawOutputRange: Color[],
  colorSpace: ColorSpace = ColorSpace.RGB
) => {
  "worklet";
  const outputRange = rawOutputRange.map((c) =>
    typeof c === "number" ? c : processColor(c)
  );
  if (colorSpace === ColorSpace.HSV) {
    return interpolateColorsHSV(value, inputRange, outputRange);
  }
  return interpolateColorsRGB(value, inputRange, outputRange);
};

export const mixColor = (
  value: number,
  color1: Color,
  color2: Color,
  colorSpace: ColorSpace = ColorSpace.RGB
) => {
  "worklet";
  return interpolateColor(value, [0, 1], [color1, color2], colorSpace);
};
