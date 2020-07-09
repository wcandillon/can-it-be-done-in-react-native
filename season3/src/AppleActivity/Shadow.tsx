import React from "react";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

import { STROKE_WIDTH } from "./Constants";

export default () => {
  return (
    <Svg width={STROKE_WIDTH} height={STROKE_WIDTH}>
      <Defs>
        <RadialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="50%" id="shadow">
          <Stop offset="0%" stopOpacity={0} />
          <Stop offset="90%" stopOpacity={0.4} stopColor="black" />
          <Stop stopColor="black" stopOpacity={0} offset="100%" />
        </RadialGradient>
      </Defs>
      <Circle
        cx={STROKE_WIDTH / 2}
        cy={STROKE_WIDTH / 2}
        r={STROKE_WIDTH / 2}
        fill="url(#shadow)"
      />
    </Svg>
  );
};
