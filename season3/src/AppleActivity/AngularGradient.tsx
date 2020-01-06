/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */
import React from "react";
import { PixelRatio, processColor } from "react-native";
import { CX, CY, Ring, SIZE, TAU } from "./Constants";
import ProcessingView from "./ProcessingView";
import { polar2Canvas } from "./Coordinates";

const SAMPLING = 75;
const SAMPLES = new Array(SAMPLING).fill(0).map((_, i) => i);
const DELTA = TAU / SAMPLING;

interface AngularGradientProps {
  ring: Ring;
}

export default ({ ring }: AngularGradientProps) => {
  const start = processColor(ring.start);
  const end = processColor(ring.end);
  const size = ring.size * PixelRatio.get();
  const center = {
    x: CX * PixelRatio.get(),
    y: CY * PixelRatio.get()
  };
  const sketch = (p: any) => {
    p.setup = () => {};

    p.draw = () => {
      p.background(0, 0, 0, 0);
      p.beginShape(8);
      SAMPLES.forEach(i => {
        const theta = i * DELTA;
        const { x: x1, y: y1 } = polar2Canvas(
          {
            alpha: theta,
            radius: size / 2
          },
          center
        );
        const { x: x2, y: y2 } = polar2Canvas(
          {
            alpha: (i + 1) * DELTA,
            radius: size / 2
          },
          center
        );
        p.noStroke();
        p.fill(p.lerpColor(end, start, i / SAMPLING));
        p.vertex(center.x, center.y);
        p.vertex(x1, y1);
        p.vertex(x2, y2);
      });
      p.endShape();
      p.noLoop();
    };
  };
  return (
    <ProcessingView
      style={{
        width: SIZE,
        height: SIZE
      }}
      {...{ sketch }}
    />
  );
};
