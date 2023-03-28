import type { SkRect, Vector } from "@shopify/react-native-skia";
import { Skia, vec } from "@shopify/react-native-skia";
import { createNoise2D } from "simplex-noise";

const pointOnRect = (t: number, rct: SkRect) => {
  const { x, y, width, height } = rct;
  if (t < 0.25) {
    return vec(x + width * (t * 4), y);
  } else if (t < 0.5) {
    return vec(x + width, y + height * ((t - 0.25) * 4));
  } else if (t < 0.75) {
    return vec(x + width - width * ((t - 0.5) * 4), y + height);
  } else {
    return vec(x, y + height - height * ((t - 0.75) * 4));
  }
};

export const drawNoisyRect = (rct: SkRect) => {
  const sample = 20;
  const F = 1;
  const A = 5;
  const noise = createNoise2D();
  const path = Skia.Path.Make();
  for (let i = 0; i < sample; i++) {
    const t = i / sample;
    const point = pointOnRect(t, rct);
    //  const rPoint =
    const d = A * noise(F * t, 0);
    if (i === 0) {
      path.moveTo(point.x + d, point.y + d);
    } else {
      path.lineTo(point.x + d, point.y + d);
    }
  }
  return path;
};

export const drawNoisyCircle = (c: Vector) => {
  const F = 1;
  const R = 15;
  const sample = 50;
  const noise = createNoise2D();
  const path = Skia.Path.Make();
  for (let i = 0; i < sample; i++) {
    const theta = (i / sample) * 2 * Math.PI;
    const r = 2 * R + R * noise(theta * F, 0);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    if (i === 0) {
      path.moveTo(x, y);
    } else {
      path.lineTo(x, y);
    }
  }
  path.close();
  const m3 = Skia.Matrix();
  m3.translate(c.x, c.y);
  path.transform(m3);
  return path;
};
