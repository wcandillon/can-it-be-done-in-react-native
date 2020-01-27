import React from "react";
import { Dimensions } from "react-native";
import { Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import Candle, { Candle as CandleModel } from "./Candle";

const { width: size } = Dimensions.get("window");

interface ChartProps {
  candles: CandleModel[];
}

const getDomain = (candles: CandleModel[]) => {
  const values = candles.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

export default ({ candles }: ChartProps) => {
  const width = size / candles.length;
  const domain = getDomain(candles);
  const scaleY = scaleLinear()
    .domain(domain)
    .range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size]);
  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle
          key={candle.date}
          {...{ candle, index, width, scaleY, scaleBody }}
        />
      ))}
    </Svg>
  );
};
