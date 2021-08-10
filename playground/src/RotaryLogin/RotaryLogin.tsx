import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, G, Mask } from "react-native-svg";
import Animated from "react-native-reanimated";

import Quadrant, {
  STROKE_WIDTH,
  RADIUS,
  center,
  DIGITS,
  PADDING,
} from "./Quadrant";
import Gesture from "./Gesture";
import Title from "./Title";
import Status from "./Status";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
});

interface DigitProps {
  cx: number;
  cy: number;
  i: number;
}

const Digit = ({ cx, cy, i }: DigitProps) => {
  return <Circle key={i} cx={cx} cy={cy} r={STROKE_WIDTH / 2 - PADDING} />;
};

const RotaryLogin = () => {
  const r = RADIUS - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * r;
  return (
    <View style={{ flex: 1 }}>
      <Svg style={styles.container}>
        <Defs>
          <Mask id="mask">
            {DIGITS.slice(0, 10).map(({ x, y }, i) => (
              <Digit key={i} i={i} cx={x} cy={y} />
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
          strokeDashoffset={1 * circumference}
          strokeLinecap="round"
        />
        <G mask="url(#mask)">
          <Quadrant />
        </G>
        <Title />
        <Status />
      </Svg>
      <Gesture />
    </View>
  );
};

export default RotaryLogin;
