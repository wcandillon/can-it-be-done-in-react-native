/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */
import React from "react";
import { Dimensions, PixelRatio, View } from "react-native";
import { ProcessingView } from "./ProcessingView";
import { polar2Canvas } from "./Coordinates";

const { width } = Dimensions.get("window");
const { PI } = Math;
const TAU = 2 * PI;

const S = width * PixelRatio.get();
const STROKE_WIDTH = 60 * PixelRatio.get();
const SAMPLING = 75;
const SAMPLES = new Array(SAMPLING).fill(0).map((_, i) => i);
const DELTA = TAU / SAMPLING;
let FROM: any;
let TO: any;
let START: number;
const DURATION = 5000;

interface Params {
  progress: number;
  total: number;
  startColor: any;
  endColor: any;
  backgroundColor: any;
  size: number;
}

const drawRing = (
  p: any,
  {
    progress: absoluteProgress,
    total,
    startColor,
    endColor,
    backgroundColor,
    size
  }: Params
) => {
  const progress = absoluteProgress / (TAU / total);
  const alpha = Math.min(progress * TAU, TAU);
  const CX = size / 2;
  const CY = size / 2;
  const { x: cx, y: cy } = polar2Canvas(
    {
      alpha,
      radius: size / 2 - STROKE_WIDTH / 2
    },
    { x: 0, y: 0 }
  );
  const rot = progress * TAU - TAU;
  p.translate(CX, CY);
  if (rot > 0) {
    p.rotate(-rot);
  }
  p.background(0, 0, 1);
  // 1. center black circle
  p.fill(0, 0, 1);
  p.noStroke();
  p.ellipse(0, 0, size - STROKE_WIDTH * 2, size - STROKE_WIDTH * 2);
  // 2. end linecap
  p.translate(cx, cy);
  p.rotate(-alpha);
  p.fill(p.lerpColor(FROM, TO, alpha / TAU));
  p.ellipse(0, 0, STROKE_WIDTH, STROKE_WIDTH);
  p.fill(0, 0, 1);
  p.arc(-3, -3, STROKE_WIDTH, STROKE_WIDTH, PI, TAU);
  p.rotate(alpha);
  p.translate(-cx, -cy);
  // 3. start linecap
  p.fill(FROM);
  p.ellipse(size / 2 - STROKE_WIDTH / 2, 0, STROKE_WIDTH, STROKE_WIDTH);

  SAMPLES.forEach(i => {
    const theta = i * DELTA;
    const currentProgress = i / SAMPLING;
    const { x: x1, y: y1 } = polar2Canvas(
      {
        alpha: theta,
        radius: size / 2
      },
      {
        x: 0,
        y: 0
      }
    );
    const { x: x2, y: y2 } = polar2Canvas(
      {
        alpha: (i + 1) * DELTA,
        radius: size / 2
      },
      {
        x: 0,
        y: 0
      }
    );
    p.noStroke();
    p.fill(
      currentProgress > progress
        ? p.color(10, 20, 30)
        : p.lerpColor(FROM, TO, i / SAMPLING)
    );
    p.beginShape(8);
    p.vertex(0, 0);
    p.vertex(x1, y1);
    p.vertex(x2, y2);
    p.endShape();
  });
  p.translate(-CX, -CY);
  if (rot > 0) {
    p.rotate(rot);
  }
};

export default () => {
  const sketch = (p: any) => {
    p.setup = () => {
      START = new Date().getTime();
      FROM = p.color(0, 217, 253);
      TO = p.color(0, 255, 169);
    };

    p.draw = () => {
      const NOW = new Date().getTime();
      const absoluteProgress =
        NOW - START > DURATION ? 1 : (NOW - START) / DURATION;
      drawRing(p, {
        progress: absoluteProgress,
        size: S,
        startColor: p.color(0, 217, 253),
        endColor: p.color(0, 255, 169),
        backgroundColor: p.color(0, 72, 77),
        total: TAU * 2.75
      });
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
