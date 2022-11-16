import React from "react";
import type {
  SkiaValue,
  SkPath,
  Vector,
  Line,
  SkPaint,
} from "@shopify/react-native-skia";
import {
  SkContourMeasure,
  Path,
  TileMode,
  mix,
  dist,
  PaintStyle,
  Drawing,
  interpolateColors,
  StrokeJoin,
  StrokeCap,
  vec,
  Group,
  rect,
  fitbox,
  processTransform2d,
  Skia,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

import { getPointAtLength } from "./Geometry";

const strokeWidth = 15;
const pad = 75;
const { width, height } = Dimensions.get("window");

export const dst = rect(pad, pad, width - pad * 2, height - pad * 2);

const repeat = <T,>(input: T[], i: number, result: T[] = []): T[] => {
  if (i <= 0) {
    return result;
  }
  return repeat(input, i - 1, result.concat(input));
};

const colors = repeat(
  [
    "#3FCEBC",
    "#3CBCEB",
    "#5F96E7",
    "#816FE3",
    "#9F5EE2",
    "#BD4CE0",
    "#DE589F",
    "#FF645E",
    "#FDA859",
    "#FAEC54",
    "#9EE671",
    "#67E282",
    "#3FCEBC",
  ],
  1
);
const inputRange = colors.map((_, i) => i / (colors.length - 1));

export interface Line {
  p1: Vector;
  p2: Vector;
  length: number;
  paint: SkPaint;
}

const delta = strokeWidth / 4;

const basePaint = Skia.Paint();
basePaint.setStrokeWidth(strokeWidth);
basePaint.setStyle(PaintStyle.Stroke);
basePaint.setStrokeJoin(StrokeJoin.Round);
basePaint.setStrokeCap(StrokeCap.Round);

export const prepare = (svg: string) => {
  const path = Skia.Path.MakeFromSVGString(svg)!;

  return { path, totalLength: 0, lines: [] };
};

interface GradientAlongPathProps {
  path: SkPath;
  totalLength: number;
  lines: Line[];
  progress: SkiaValue<number>;
}

export const GradientAlongPath = ({
  path,
  progress,
  lines,
  totalLength,
}: GradientAlongPathProps) => {
  return (
    <Group>
      <Path path={path} color="white" />
    </Group>
  );
};
