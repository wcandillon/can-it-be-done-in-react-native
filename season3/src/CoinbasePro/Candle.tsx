import React from "react";
import { View } from "react-native";
import { ScaleLinear } from "d3-scale";

import { Line, Rect } from "react-native-svg";

export const TIMESTAMP = 0;
export const OPEN = 1;
export const HIGH = 2;
export const LOW = 3;
export const CLOSE = 4;

const MARGIN = 2;

interface CandleProps {
  candle: number[];
  index: number;
  width: number;
  scaleY: ScaleLinear<number, number>;
}

export default ({ candle, index, width, scaleY }: CandleProps) => {
  const [timestamp, open, high, low, close] = candle;
  const fill = close > open ? "#4AFA9A" : "#E33F64";
  const x = index * width;
  const body = Math.max(open, close) - Math.min(open, close);
  return (
    <>
      <Line
        x1={x + width / 2}
        y1={scaleY(low)}
        x2={x + width / 2}
        y2={scaleY(high)}
        stroke={fill}
        strokeWidth={1}
      />
      <Rect
        x={x + MARGIN}
        y={scaleY(close > open ? close : open)}
        width={width - MARGIN * 2}
        height={scaleY(body)}
        {...{ fill }}
      />
    </>
  );
};
