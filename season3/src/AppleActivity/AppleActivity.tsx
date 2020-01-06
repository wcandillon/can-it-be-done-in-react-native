/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */
import React from "react";
import { Dimensions, View } from "react-native";
import { ProcessingView } from "./ProcessingView";
import { polar2Canvas } from "./Coordinates";
import { CX, CY, PI, R1, R2, R3, STROKE_WIDTH, TAU } from "./Constants";

const { width } = Dimensions.get("window");

const SAMPLING = 75;
const SAMPLES = new Array(SAMPLING).fill(0).map((_, i) => i);
const DELTA = TAU / SAMPLING;

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
  // 1. center black circle
  p.fill(0, 0, 1);
  p.noStroke();
  p.ellipse(0, 0, size - STROKE_WIDTH * 2, size - STROKE_WIDTH * 2);
  // 2. end linecap
  p.translate(cx, cy);
  p.rotate(-alpha);
  p.fill(p.lerpColor(startColor, endColor, alpha / TAU));
  p.ellipse(0, 0, STROKE_WIDTH, STROKE_WIDTH);
  p.fill(0, 0, 1);
  p.arc(-3, -3, STROKE_WIDTH, STROKE_WIDTH, PI, TAU);
  p.rotate(alpha);
  p.translate(-cx, -cy);
  // 3. start linecap
  p.fill(startColor);
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
        ? backgroundColor
        : p.lerpColor(startColor, endColor, i / SAMPLING)
    );
    p.beginShape(8);
    p.vertex(0, 0);
    p.vertex(x1, y1);
    p.vertex(x2, y2);
    p.endShape();
  });
  if (rot > 0) {
    p.rotate(rot);
  }
  p.translate(-CX, -CY);
};

let progress = 0;
export default () => {
  const sketch = (p: any) => {
    p.setup = () => {};

    p.draw = () => {
      progress += 1 / SAMPLING;
      if (progress >= 1) {
        p.noLoop();
      }
      p.background(0, 0, 0, 0);
      drawRing(p, {
        progress,
        size: R1.size,
        startColor: p.color(...R1.start),
        endColor: p.color(...R1.end),
        backgroundColor: p.color(...R1.bg),
        total: R1.value
      });
      drawRing(p, {
        progress,
        size: R2.size,
        startColor: p.color(...R2.start),
        endColor: p.color(...R2.end),
        backgroundColor: p.color(...R2.bg),
        total: R2.value
      });
      drawRing(p, {
        progress,
        size: R3.size,
        startColor: p.color(...R3.start),
        endColor: p.color(...R3.end),
        backgroundColor: p.color(...R3.bg),
        total: R3.value
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
      <ProcessingView
        style={{
          width,
          height: width,
          transform: [{ rotate: "-270deg" }, { rotateY: "180deg" }]
        }}
        {...{ sketch }}
      />
    </View>
  );
};
