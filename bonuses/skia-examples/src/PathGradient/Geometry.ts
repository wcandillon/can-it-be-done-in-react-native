import type {
  SkContourMeasure,
  SkPath,
  Vector,
} from "@shopify/react-native-skia";
import { Skia, vec } from "@shopify/react-native-skia";

export const getPointAtLength = (length: number, from: Vector, to: Vector) => {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x = from.x + length * Math.cos(angle);
  const y = from.y + length * Math.sin(angle);
  return vec(x, y);
};

export class PathGeometry {
  private totalLength = 0;
  private contours: { from: number; to: number; contour: SkContourMeasure }[] =
    [];

  constructor(path: SkPath, resScale = 1) {
    const it = Skia.ContourMeasureIter(path, false, resScale);
    let contour: SkContourMeasure | null;
    while ((contour = it.next())) {
      const from = this.totalLength;
      const to = from + contour.length();
      this.totalLength = to;
      this.contours.push({ from, to, contour });
    }
  }

  getTotalLength() {
    return this.totalLength;
  }

  getPointAtLength(length: number) {
    const contour = this.contours.find(
      ({ from, to }) => length >= from && length <= to
    );
    if (!contour) {
      throw new Error(`Invalid length ${length}`);
    }
    const posTan = contour.contour.getPosTan(length - contour.from);
    return vec(posTan.px, posTan.py);
  }
}
