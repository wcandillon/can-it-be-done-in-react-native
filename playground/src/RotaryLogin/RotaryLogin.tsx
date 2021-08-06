import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle, Defs, G, Mask } from "react-native-svg";

import Quadrant, {
  STROKE_WIDTH,
  RADIUS,
  center,
  DIGITS,
  PADDING,
} from "./Quadrant";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
});

const RotaryLogin = () => {
  const r = RADIUS - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * r;
  return (
    <Svg style={styles.container}>
      <Defs>
        <Mask id="mask">
          {DIGITS.map(({ x, y }, i) => (
            <Circle
              key={i}
              cx={x}
              cy={y}
              r={STROKE_WIDTH / 2 - PADDING}
              fill="white"
            />
          ))}
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
        strokeWidth={STROKE_WIDTH - PADDING}
        stroke="white"
        strokeDasharray={[circumference, circumference]}
        strokeDashoffset={-0.25 * circumference}
        strokeLinecap="round"
      />
      <G mask="url(#mask)">
        <Quadrant />
      </G>
    </Svg>
  );
};

export default RotaryLogin;
