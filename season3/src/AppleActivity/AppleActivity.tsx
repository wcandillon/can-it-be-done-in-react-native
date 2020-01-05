/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */
import React from "react";
import { Dimensions, PixelRatio, View } from "react-native";
import Color from "color";
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
const STROKE_WIDTH = 80 * PixelRatio.get();
const SAMPLING = 100;
const SAMPLES = new Array(SAMPLING).fill(0).map((_, i) => i);
const DELTA = TAU / SAMPLING;
let FROM: any;
let TO: any;
let START: number;
const DURATION = 5000;

export default () => {
  const sketch = (p: any) => {
    p.setup = () => {
      START = new Date().getTime();
      FROM = p.color(233, 2, 22);
      TO = p.color(251, 39, 115);
    };

    p.draw = () => {
      p.background(0, 0, 1);
      p.fill(0, 0, 1);
      p.ellipse(CX, CY, SIZE - STROKE_WIDTH, SIZE - STROKE_WIDTH);
      const NOW = new Date().getTime();
      const progress = NOW - START > DURATION ? 1 : (NOW - START) / DURATION;
      p.beginShape("triangles");
      p.noStroke();
      SAMPLES.forEach(i => {
        const theta = i * DELTA;
        const { x: x1, y: y1 } = polar2Canvas(
          {
            alpha: theta,
            radius: SIZE / 2
          },
          {
            x: CX,
            y: CY
          }
        );
        const { x: x2, y: y2 } = polar2Canvas(
          {
            alpha: (i + 1) * DELTA,
            radius: SIZE / 2
          },
          {
            x: CX,
            y: CY
          }
        );
        p.fill(p.lerpColor(FROM, TO, i / SAMPLING));
        p.vertex(CX, CY);
        p.vertex(x1, y1);
        p.vertex(x2, y2);
      });
      p.endShape();
    };
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0, 0, 1)"
      }}
    >
      <ProcessingView style={{ width, height: width }} {...{ sketch }} />
    </View>
  );
};
