import type { SkPoint, SkRect } from "@shopify/react-native-skia";
import { vec, Skia } from "@shopify/react-native-skia";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

export const inflate = (box: SkRect, dx: number, dy: number, tx = 0, ty = 0) =>
  Skia.XYWHRect(
    box.x - dx + tx,
    box.y - dy + ty,
    box.width + 2 * dx,
    box.height + 2 * dy
  );

export const deflate = (box: SkRect, dx: number, dy: number, tx = 0, ty = 0) =>
  inflate(box, -dx, -dy, tx, ty);

export const drawBlob = (rct: SkRect, A = 25) => {
  const path = Skia.Path.Make();
  const a = 200; // Semi-major axis
  const b = 100; // Semi-minor axis
  const h = a / 2; // Center x-coordinate
  const k = b / 2; // Center y-coordinate
  const numPoints = 10; // Number of points to generate
  const ellipsePoints = generateEllipsePoints(a, b, h, k, numPoints);
  ellipsePoints.forEach((p, i) => {
    if (i === 0) {
      path.moveTo(p.x, p.y);
    } else {
      const p1 = ellipsePoints[i - 1];
      path.quadTo(p1.x, p1.y, p.x, p.y);
    }
  });
  return path;
};

const generateEllipsePoints = (
  a: number,
  b: number,
  h = 0,
  k = 0,
  numPoints = 100
) => {
  const points: SkPoint[] = [];
  const tValues: number[] = Array.from(
    { length: numPoints },
    (_, i) => (2 * Math.PI * i) / numPoints
  );
  const noiseAmplitude = 50; // Amplitude of the noise
  const noiseScale = 0.5; // Scale factor for the noise

  for (const t of tValues) {
    const xNoise =
      noise2D(h + a * Math.cos(t), k + b * Math.sin(t)) * noiseAmplitude;
    const yNoise =
      noise2D(h + a * Math.sin(t), k + b * Math.cos(t)) * noiseAmplitude;
    const x: number = h + a * Math.cos(t) + noiseScale * xNoise;
    const y: number = k + b * Math.sin(t) + noiseScale * yNoise;
    points.push(vec(x, y));
  }

  return points;
};
