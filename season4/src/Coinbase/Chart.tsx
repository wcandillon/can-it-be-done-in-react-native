import React from "react";
import { Svg } from "react-native-svg";

import Candle from "./Candle";
import { SIZE, STEP, CANDLES } from "./ChartHelpers";

const Chart = () => (
  <Svg width={SIZE} height={SIZE}>
    {CANDLES.map((candle, index) => (
      <Candle key={candle.date} width={STEP} {...{ candle, index }} />
    ))}
  </Svg>
);

export default Chart;
