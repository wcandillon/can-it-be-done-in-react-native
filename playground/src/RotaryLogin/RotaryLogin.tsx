import React from "react";
import { StyleSheet } from "react-native";
import { vec } from "react-native-redash";
import Svg, { Circle, Defs, G, Mask } from "react-native-svg";

import Quadrant, { STROKE_WIDTH, RADIUS, center, rotate } from "./Quadrant";

const RotaryLogin = () => {
  const r = RADIUS - STROKE_WIDTH / 2;
  const circumference = Math.PI * r;
  const { x, y } = rotate(
    vec.create(center.x + RADIUS - STROKE_WIDTH / 2, center.y),
    center,
    0
  );
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Defs>
        <Mask id="mask">
          <Circle cx={x} cy={y} r={STROKE_WIDTH / 2} fill="white" />
        </Mask>
      </Defs>
      <Quadrant />
      <Circle
        fill="white"
        cx={center.x}
        cy={center.y}
        r={RADIUS - STROKE_WIDTH}
      />
      <Circle
        cx={center.x}
        cy={center.y}
        r={r}
        strokeWidth={STROKE_WIDTH}
        stroke="red"
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={circumference / 2}
        strokeLinecap="round"
      />
      <G mask="url(#mask)">
        <Quadrant />
      </G>
    </Svg>
  );
};

export default RotaryLogin;
