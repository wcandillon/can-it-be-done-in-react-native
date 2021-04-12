import React from "react";
import { Dimensions } from "react-native";
import { clamp } from "react-native-redash";
import Svg, { Line } from "react-native-svg";

const { width } = Dimensions.get("window");
const PADDING = 16;
const WIDTH = width - PADDING * 2;
const HEIGHT = 200;
const STEPS = 4;
const STEP = WIDTH / STEPS;
const STROKE = 1;
const Controls = () => {
  return (
    <Svg width={width} height={HEIGHT}>
      {Array.from({ length: STEPS + 1 }, (_, i) => i).map((i) => {
        const x = PADDING + clamp(STEP * i, STROKE / 2, WIDTH - STROKE / 2);
        return (
          <Line
            key={i}
            x1={x}
            y1={0}
            x2={x}
            y2={HEIGHT}
            stroke="white"
            strokeWidth={STROKE}
          />
        );
      })}
    </Svg>
  );
};

export default Controls;
