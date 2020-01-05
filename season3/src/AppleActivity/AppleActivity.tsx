/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */
import React from "react";
import { Dimensions, PixelRatio, View } from "react-native";
import { ProcessingView } from "./ProcessingView";

const { width } = Dimensions.get("window");
const { cos, sin, PI } = Math;
const TAU = 2 * PI;

interface Point {
  x: number;
  y: number;
}

interface PolarPoint {
  alpha: number;
  radius: number;
}

const cartesian2Canvas = ({ x, y }: Point, center: Point) => ({
  x: x + center.x,
  y: -y + center.y
});

const polar2Cartesian = ({ alpha, radius }: PolarPoint) => ({
  x: radius * cos(alpha),
  y: radius * sin(alpha)
});

const polar2Canvas = ({ alpha, radius }: PolarPoint, center: Point) =>
  cartesian2Canvas(
    polar2Cartesian({
      alpha,
      radius
    }),
    center
  );

const SIZE = width * PixelRatio.get();
const CX = SIZE / 2;
const CY = SIZE / 2;
const STROKE_WIDTH = 40;
const SAMPLING = 360;
const SAMPLES = new Array(SAMPLING).fill(0).map((_, i) => i);
const DELTA = TAU / SAMPLING;
let FROM: any;
let TO: any;

export default () => {
  const sketch = (p: any) => {
    p.setup = () => {
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
        p.strokeWeight(4);
        p.line(x1, y1, x2, y2);
      });
    };
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ProcessingView style={{ width, height: width }} {...{ sketch }} />
    </View>
  );
};
