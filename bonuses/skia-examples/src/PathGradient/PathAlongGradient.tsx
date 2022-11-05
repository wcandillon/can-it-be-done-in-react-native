import type {
  SkContourMeasure,
  SkiaValue,
  SkPath,
  Vector,
  Line,
  SkPaint,
} from "@shopify/react-native-skia";
import {
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
  2
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

interface Line {
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
  let accumulatedLength = 0;
  contours.forEach((contour) => {
    const length = contour.length();
    const samples = Math.round(length / delta);
    for (let i = 0; i <= samples; i++) {
      if (i === 0) {
        continue;
      }
      const l = (i - 1) * delta;
      const prev = contour.getPosTan(l);
      const current = contour.getPosTan(i * delta);
      const p1 = vec(prev.px, prev.py);
      const p2 = vec(current.px, current.py);
      const paint = basePaint.copy();
      paint.setColor(
        interpolateColors(accumulatedLength / totalLength, inputRange, colors)
      );
      lines.push({ length: accumulatedLength, p1, p2, paint });
      accumulatedLength += delta;
    }
  });
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
  progress,
  lines,
  totalLength,
}: GradientAlongPathProps) => {
  return (
    <Group>
      <Drawing
        drawing={({ canvas }) => {
          lines.map(({ p1, p2, length, paint }) => {
            if (length > totalLength * progress.current) {
              return;
            }
            canvas.drawLine(p1.x, p1.y, p2.x, p2.y, paint);
          });
        }}
      />
    </Group>
  );
};
