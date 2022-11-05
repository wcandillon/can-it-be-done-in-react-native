import type {
  SkContourMeasure,
  SkiaValue,
  SkPath,
  Vector,
  Line,
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
import { useMemo } from "react";
import { Dimensions } from "react-native";

const strokeWidth = 15;
const pad = 50;
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

const colors2 = repeat(
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
  4
);

interface Line {
  p1: Vector;
  p2: Vector;
  length: number;
}

const delta = strokeWidth / 4;

export const prepare = (svg: string) => {
  const path = Skia.Path.MakeFromSVGString(svg)!;
  const bounds = path.computeTightBounds();
  const transform = fitbox("contain", bounds, dst);
  path.transform(processTransform2d(transform));
  const contour = Skia.ContourMeasureIter(path, false, 1);
  let totalLength = 0;
  let it: SkContourMeasure | null;
  const lines: Line[] = [];
  while ((it = contour.next())) {
    const length = it.length();
    const samples = Math.round(length / delta);
    for (let i = 0; i <= samples; i++) {
      const posTan = it.getPosTan(i * delta);
      if (i === 0) {
        continue;
      }
      const l = (i - 1) * delta;
      const prev = it.getPosTan(l);
      const p1 = vec(prev.px, prev.py);
      const p2 = vec(posTan.px, posTan.py);
      lines.push({ length: totalLength + l, p1, p2 });
    }
    totalLength += length;
  }
  const stroke = path.copy();
  stroke.stroke({
    width: strokeWidth,
    cap: StrokeCap.Round,
    join: StrokeJoin.Round,
  });
  stroke.simplify();
  return { path, totalLength, lines, stroke };
};

interface PathAlongGradientProps {
  path: SkPath;
  totalLength: number;
  lines: Line[];
  progress: SkiaValue<number>;
  stroke: SkPath;
}
// color={
//   colors2[Math.round((length / totalLength) * (colors2.length - 1))]
// }

const paint = Skia.Paint();
paint.setStrokeWidth(strokeWidth);
paint.setStyle(PaintStyle.Stroke);
paint.setStrokeJoin(StrokeJoin.Round);
paint.setStrokeCap(StrokeCap.Round);

export const PathAlongGradient = ({
  progress,
  lines,
  totalLength,
}: PathAlongGradientProps) => {
  const paints = useMemo(() => {
    return lines.map(({ length }) => {
      const p = paint.copy();
      p.setColor(interpolateColors(length / totalLength, inputRange, colors));
      return p;
    });
  }, [lines, totalLength]);
  return (
    <Group>
      <Drawing
        drawing={({ canvas }) => {
          lines.map(({ p1, p2, length }, i) => {
            if (length > totalLength * progress.current) {
              return;
            }
            canvas.drawLine(p1.x, p1.y, p2.x, p2.y, paints[i]!);
          });
        }}
      />
    </Group>
  );
};
