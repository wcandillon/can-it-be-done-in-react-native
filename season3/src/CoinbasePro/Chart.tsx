import React from "react";
import { Dimensions } from "react-native";
import { Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import Candle, { HIGH, LOW, TIMESTAMP } from "./Candle";

const { width: size } = Dimensions.get("window");

type Candle = number[];

interface ChartProps {
  candles: Candle[];
}

const getDomain = (candles: Candle[]) => {
  const values = candles.map(candle => [candle[HIGH], candle[LOW]]).flat();
  return [Math.min(...values), Math.max(...values)];
};

export default ({ candles }: ChartProps) => {
  const width = size / candles.length;
  const domain = getDomain(candles);
  const scaleY = scaleLinear()
    .domain(domain)
    .range([0, size]);
  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle key={candle[TIMESTAMP]} {...{ candle, index, width, scaleY }} />
      ))}
    </Svg>
  );
};
