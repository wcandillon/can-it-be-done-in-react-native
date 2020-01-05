/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */
import React from "react";
import { Dimensions, PixelRatio, View } from "react-native";
import { ProcessingView } from "./ProcessingView";
import { polar2Canvas } from "./Coordinates";

const { width } = Dimensions.get("window");
const { PI } = Math;
const TAU = 2 * PI;

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
const MAX_PROGRESS = TAU * 2.5;

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
      const progress = absoluteProgress / (TAU / MAX_PROGRESS);
      const alpha = Math.min(progress * TAU, TAU);
      const { x: cx, y: cy } = polar2Canvas(
        {
          alpha,
          radius: SIZE / 2 - STROKE_WIDTH / 2
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
      p.ellipse(0, 0, SIZE - STROKE_WIDTH * 2, SIZE - STROKE_WIDTH * 2);
      // 2. end linecap
      p.translate(cx, cy);
      p.rotate(-alpha);
      p.fill(p.lerpColor(FROM, TO, alpha / TAU));
      p.arc(0, 0, STROKE_WIDTH, STROKE_WIDTH, PI, TAU);
      p.fill(0, 0, 1);
      p.arc(-3, -3, STROKE_WIDTH, STROKE_WIDTH, PI, TAU);
      p.rotate(alpha);
      p.translate(-cx, -cy);
      p.beginShape("triangles");
      SAMPLES.forEach(i => {
        const theta = i * DELTA;
        const currentProgress = i / SAMPLING;
        if (currentProgress > progress) {
          return;
        }
        const { x: x1, y: y1 } = polar2Canvas(
          {
            alpha: theta,
            radius: SIZE / 2
          },
          {
            x: 0,
            y: 0
          }
        );
        const { x: x2, y: y2 } = polar2Canvas(
          {
            alpha: (i + 1) * DELTA,
            radius: SIZE / 2
          },
          {
            x: 0,
            y: 0
          }
        );
        p.fill(p.lerpColor(FROM, TO, i / SAMPLING));
        p.vertex(0, 0);
        p.vertex(x1, y1);
        p.vertex(x2, y2);
      });
      p.endShape();
      // 3. start linecap
      p.fill(FROM);
      p.ellipse(0, 0, STROKE_WIDTH, STROKE_WIDTH);
      p.translate(-CX, -CY);
      if (rot > 0) {
        p.rotate(rot);
      }
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
