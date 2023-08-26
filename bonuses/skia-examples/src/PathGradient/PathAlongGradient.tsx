import React from "react";
import type {
  SkiaValue,
  SkPath,
  Vector,
  Line,
  SkPaint,
} from "@shopify/react-native-skia";
import {
  clamp,
  TileMode,
  dist,
  PaintStyle,
  Drawing,
  interpolateColors,
  StrokeJoin,
  StrokeCap,
  Group,
  rect,
  Skia,
} from "@shopify/react-native-skia";
import { Dimensions, StyleSheet } from "react-native";

import { fitRect, getPointAtLength, PathGeometry } from "./Geometry";

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

const basePaint = Skia.Paint();
basePaint.setStrokeWidth(strokeWidth);
basePaint.setStyle(PaintStyle.Stroke);
basePaint.setStrokeJoin(StrokeJoin.Round);
basePaint.setStrokeCap(StrokeCap.Round);

const tolerance = StyleSheet.hairlineWidth;
const tessellate = (geo: PathGeometry, t0: number, t1: number): Line[] => {
  const p0 = geo.getPointAtLength(t0);
  const p1 = geo.getPointAtLength(t1);
  const t05 = (t0 + t1) / 2;
  const p05 = getPointAtLength(0.5 * dist(p0, p1), p0, p1);
  const c05 = geo.getPointAtLength(t05);
  const d = dist(p05, c05);
  if (d > tolerance || dist(p0, p1) > 40) {
    return [...tessellate(geo, t0, t05), ...tessellate(geo, t05, t1)];
  } else {
    const paint = basePaint.copy();
    const startColor = interpolateColors(
      t0 / geo.getTotalLength(),
      inputRange,
      colors
    );
    const endColor = interpolateColors(
      t1 / geo.getTotalLength(),
      inputRange,
      colors
    );
    const gradient = Skia.Shader.MakeLinearGradient(
      p0,
      p1,
      [Skia.Color(startColor), Skia.Color(endColor)],
      null,
      TileMode.Clamp
    );
    paint.setShader(gradient);
    return [{ p1: p0, p2: p1, length: t0, paint }];
  }
};

export const prepare = (svg: string) => {
  const path = Skia.Path.MakeFromSVGString(svg)!;
  const src = path.computeTightBounds();
  const m3 = fitRect(src, dst);
  path.transform(m3);
  const geo = new PathGeometry(path);
  const totalLength = geo.getTotalLength();
  const lines = tessellate(geo, 0, totalLength);
  return { path, totalLength, lines };
};

export interface Line {
  p1: Vector;
  p2: Vector;
  length: number;
  paint: SkPaint;
}

interface GradientAlongPathProps {
  path: SkPath;
  totalLength: number;
  lines: Line[];
  progress: SkiaValue<number>;
}

export const GradientAlongPath = ({
  progress,
  lines,
  totalLength,
}: GradientAlongPathProps) => {
  return (
    <Group>
      <Drawing
        // We use the non-existing "progress" property Skia to register the animation Value
        // This is only necessary with custom drawings (<Drawing />)
        // We will improve this
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        progress={progress}
        drawing={({ canvas }) => {
          lines.forEach((line) => {
            const currentLength = totalLength * progress.current;
            const { p1, p2, length, paint } = line;
            if (length > currentLength) {
              return;
            }
            const currentProgress = clamp(currentLength - length, 0, 1);
            const p3 = getPointAtLength(currentProgress * dist(p1, p2), p1, p2);
            canvas.drawLine(p1.x, p1.y, p3.x, p3.y, paint);
          });
        }}
      />
    </Group>
  );
};
