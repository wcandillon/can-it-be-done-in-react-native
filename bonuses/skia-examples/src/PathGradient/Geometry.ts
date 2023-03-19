import type {
  SkContourMeasure,
  SkPath,
  SkRect,
  Vector,
} from "@shopify/react-native-skia";
import {
  fitbox,
  processTransform2d,
  Skia,
  vec,
} from "@shopify/react-native-skia";

export const fitRect = (src: SkRect, dst: SkRect) =>
  processTransform2d(fitbox("contain", src, dst));

export const getPointAtLength = (length: number, from: Vector, to: Vector) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x = from.x + length * Math.cos(angle);
  const y = from.y + length * Math.sin(angle);
  return vec(x, y);
};

export class PathGeometry {
  private totalLength = 0;
  private contour: SkContourMeasure;

  constructor(path: SkPath, resScale = 1) {
    const it = Skia.ContourMeasureIter(path, false, resScale);
    const contour: SkContourMeasure = it.next()!;
    this.totalLength = contour.length();
    this.contour = contour;
  }

  getTotalLength() {
    return this.totalLength;
  }

  getPointAtLength(length: number) {
    const [pos] = this.contour.getPosTan(length);
    return pos;
  }
}
