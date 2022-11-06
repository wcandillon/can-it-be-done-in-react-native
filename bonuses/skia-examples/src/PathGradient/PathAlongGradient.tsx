import React from "react";
import type {
  SkContourMeasure,
  SkiaValue,
  SkPath,
  Vector,
  Line,
  SkPaint,
} from "@shopify/react-native-skia";
import {
  TileMode,
  Path,
  mix,
  dist,
  add,
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
import { Dimensions, StyleSheet } from "react-native";

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

// const colors2 = repeat(
//   [
//     "#3FCEBC",
//     "#3CBCEB",
//     "#5F96E7",
//     "#816FE3",
//     "#9F5EE2",
//     "#BD4CE0",
//     "#DE589F",
//     "#FF645E",
//     "#FDA859",
//     "#FAEC54",
//     "#9EE671",
//     "#67E282",
//     "#3FCEBC",
//   ],
//   4
// );

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

const mul = (a: number, b: Vector) => vec(b.x * a, b.y * a);
const getPointAtLength = (length: number, from: Vector, to: Vector) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x = from.x + length * Math.cos(angle);
  const y = from.y + length * Math.sin(angle);
  return vec(x, y);
};

const tessalate = (
  t0: number,
  t1: number,
  p0: Vector,
  p1: Vector,
  contour: SkContourMeasure,
  lines: Line[],
  length: number,
  totalLength: number
) => {
  const t05 = mix(0.5, t0, t1);
  const pos = contour.getPosTan(t05);
  const c05 = vec(pos.px, pos.py);
  const d = dist(p0, p1);
  const p05 = getPointAtLength(0.5 * d, p0, p1);
  if (dist(c05, p05) > 0.1) {
    tessalate(t0, t05, p0, c05, contour, lines, length, totalLength);
    tessalate(t05, t1, c05, p1, contour, lines, t05, totalLength);
  } else {
    const paint = basePaint.copy();
    const start = interpolateColors(length / totalLength, inputRange, colors);
    const end = interpolateColors(
      (length + d) / totalLength,
      inputRange,
      colors
    );
    paint.setShader(
      Skia.Shader.MakeLinearGradient(p0, p1, [start, end], null, TileMode.Clamp)
    );
    lines.push({ p1: p0, p2: p1, length, paint });
  }
};

export const prepare = (svg: string) => {
  const path = Skia.Path.MakeFromSVGString(svg)!;
  const bounds = path.computeTightBounds();
  const transform = fitbox("contain", bounds, dst);
  path.transform(processTransform2d(transform));
  const contourIter = Skia.ContourMeasureIter(path, false, 1);
  let totalLength = 0;
  let it: SkContourMeasure | null;
  const contours: SkContourMeasure[] = [];
  while ((it = contourIter.next())) {
    totalLength += it.length();
    contours.push(it);
  }
  const lines: Line[] = [];
  contours.forEach((contour) => {
    const posTan0 = contour.getPosTan(0);
    const posTan1 = contour.getPosTan(contour.length());
    const p0 = vec(posTan0.px, posTan0.py);
    const p1 = vec(posTan1.px, posTan1.py);
    tessalate(0, contour.length(), p0, p1, contour, lines, 0, contour.length());
  });
  //  LOG  {"l": 53}
  //LOG  {"l": 72}
  //{"l": 105}
  // 203
  // let accumulatedLength = 0;
  // contours.forEach((contour) => {
  //   const length = contour.length();
  //   const samples = Math.round(length / delta);
  //   for (let i = 0; i <= samples; i++) {
  //     if (i === 0) {
  //       continue;
  //     }
  //     const l = (i - 1) * delta;
  //     const prev = contour.getPosTan(l);
  //     const current = contour.getPosTan(i * delta);
  //     const p1 = vec(prev.px, prev.py);
  //     const p2 = vec(current.px, current.py);
  //     const paint = basePaint.copy();
  //     paint.setColor(
  //       interpolateColors(accumulatedLength / totalLength, inputRange, colors)
  //     );
  //     lines.push({ length: accumulatedLength, p1, p2, paint });
  //     accumulatedLength += delta;
  //   }
  // });
  // console.log({ l: lines.length });
  const stroke = path.copy();
  stroke.stroke({
    width: strokeWidth,
    cap: StrokeCap.Round,
    join: StrokeJoin.Round,
  });
  stroke.simplify();
  return { path, totalLength, lines, stroke };
};

interface GradientAlongPathProps {
  path: SkPath;
  totalLength: number;
  lines: Line[];
  progress: SkiaValue<number>;
  stroke: SkPath;
}
// color={
//   colors2[Math.round((length / totalLength) * (colors2.length - 1))]
// }

export const GradientAlongPath = ({
  path,
  progress,
  lines,
  totalLength,
}: GradientAlongPathProps) => {
  return (
    <Group>
      <Drawing
        drawing={({ canvas }) => {
          lines.map(({ p1, p2, length, paint }) => {
            const current = totalLength * progress.current;
            if (length >= current) {
              return;
            }
            const d = dist(p1, p2);
            if (d > current) {
              const p3 = getPointAtLength(current - length, p1, p2);
              canvas.drawLine(p1.x, p1.y, p3.x, p3.y, paint);
            } else {
              canvas.drawLine(p1.x, p1.y, p2.x, p2.y, paint);
            }
          });
        }}
      />
    </Group>
  );
};
