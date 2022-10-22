/* eslint-disable max-len */
import type { SkiaValue, SkPath, Vector } from "@shopify/react-native-skia";
import {
  fitbox,
  Group,
  mix,
  Path,
  useComputedValue,
  Skia,
} from "@shopify/react-native-skia";
import React from "react";
import { interpolate } from "flubber";

const bounds = { x: 0, y: 0, width: 100, height: 126 };

const Flubber2SkiaInterpolator = (from: SkPath, to: SkPath) => {
  const interpolator = interpolate(from.toSVGString(), to.toSVGString());
  const d = 1e-3;
  const i0 = Skia.Path.MakeFromSVGString(interpolator(d))!;
  const i1 = Skia.Path.MakeFromSVGString(interpolator(1 - d))!;
  return (t: number) => {
    if (t < d) {
      return from;
    }
    if (1 - t < d) {
      return to;
    }
    return i1.interpolate(i0, t)!;
  };
};

const playLeft = Skia.Path.MakeFromSVGString(
  "M51 23V33.3V43.6V64.1V84.7V105.2L73.3 89.9L95.5 74.5C97.2 73.3 98.6 71.8 99.6 70C100.5 68.2 101 66.2 101 64.1C101 62.1 100.5 60 99.6 58.2C98.6 56.4 97.2 54.9 95.5 53.7L73.3 38.4L51 23Z"
)!;
const pauseLeft = Skia.Path.MakeFromSVGString(
  "M84.7 1C80.2 1 76 2.8 72.9 5.9C69.8 9 68 13.2 68 17.7V106.6C68 111 69.8 115.2 72.9 118.3C76 121.5 80.2 123.2 84.7 123.2C89.1 123.2 93.3 121.5 96.5 118.3C99.6 115.2 101.3 111 101.3 106.6V17.7C101.3 13.2 99.6 9 96.5 5.9C93.3 2.8 89.1 1 84.7 1Z"
)!;
const leftPath = Flubber2SkiaInterpolator(playLeft, pauseLeft);

const pauseRight = Skia.Path.MakeFromSVGString(
  "M17.7 3C13.2 3 9 4.8 5.9 7.9C2.8 11 1 15.2 1 19.7V108.6C1 113 2.8 117.2 5.9 120.3C9 123.5 13.2 125.2 17.7 125.2C22.1 125.2 26.3 123.5 29.5 120.3C32.6 117.2 34.3 113 34.3 108.6V19.7C34.3 15.2 32.6 11 29.5 7.9C26.3 4.8 22.1 3 17.7 3Z"
)!;
const playRight = Skia.Path.MakeFromSVGString(
  "M9 126C4.5 124 1.4 119.6 1 114.6V13.7C1.2 11.3 2 8.9 3.4 6.9C4.9 4.9 6.8 3.3 9 2.3C10.8 1.4 12.8 1 14.7 1C15.2 1 15.7 1 16.1 1.1C18.6 1.3 20.9 2.2 22.9 3.7L51 23V105.3L22.9 124.6C21.3 125.8 19.5 126.6 17.6 127H11.9C10.9 126.8 9.9 126.5 9 126Z"
)!;
const rightPath = Flubber2SkiaInterpolator(playRight, pauseRight);

interface PlayProps {
  progress: SkiaValue<number>;
  c: Vector;
  r: number;
}

export const Play = ({ progress, c, r }: PlayProps) => {
  const left = useComputedValue(() => {
    return leftPath(progress.current);
  }, [progress]);
  const right = useComputedValue(() => {
    return rightPath(progress.current);
  }, [progress]);
  const transform = useComputedValue(() => {
    const sf = 0.45;
    const h = r * sf * 2;
    const centroid = h / 2 - h / 3;
    return [
      ...fitbox("contain", bounds, {
        x: c.x - h / 2,
        y: c.y - h / 2,
        width: h,
        height: h,
      }),
      { translateX: mix(progress.current, centroid, 0) },
    ];
  }, [progress]);
  return (
    <Group color="white" transform={transform}>
      <Path path={left} />
      <Path path={right} />
    </Group>
  );
};
