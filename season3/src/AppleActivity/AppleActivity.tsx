import React from "react";
import { ProcessingView } from "./ProcessingView";

const { atan2, cos, sin, sqrt, PI } = Math;

const cartesian2Canvas = ({ x, y }, center) => ({
  x: x + center.x,
  y: -y + center.y
});

const polar2Cartesian = ({ alpha, radius }) => ({
  x: radius * cos(alpha),
  y: radius * sin(alpha)
});

const polar2Canvas = ({ alpha, radius }, center) =>
  cartesian2Canvas(
    polar2Cartesian({
      alpha,
      radius
    }),
    center
  );

const SIZE = 400;
const CX = SIZE / 2;
const CY = SIZE / 2;
const STROKE_WIDTH = 40;
const SAMPLING = 360;
const SAMPLES = new Array(SAMPLING).fill(0).map((_, i) => i);
const DELTA = (2 * Math.PI) / SAMPLING;
let FROM;
let TO;

export default () => {
  const sketch = p => {
    p.setup = () => {
      p.size(SIZE, SIZE);
      FROM = p.color(233, 2, 22);
      TO = p.color(251, 39, 115);
    };

    p.draw = () => {
      SAMPLES.forEach(i => {
        const theta = i * DELTA;
        const { x: x1, y: y1 } = polar2Canvas(
          {
            alpha: theta,
            radius: SIZE / 2 - STROKE_WIDTH
          },
          {
            x: CX,
            y: CY
          }
        );
        const { x: x2, y: y2 } = polar2Canvas(
          {
            alpha: theta,
            radius: SIZE / 2
          },
          {
            x: CX,
            y: CY
          }
        );
        p.stroke(p.lerpColor(FROM, TO, i / SAMPLING));
        p.strokeWeight(3);
        p.line(x1, y1, x2, y2);
      });
    };
  };
  return <ProcessingView style={{ flex: 1 }} sketch={sketch} />;
};
