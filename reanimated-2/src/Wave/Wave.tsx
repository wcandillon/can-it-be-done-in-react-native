import React from "react";
import { Dimensions } from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";
import Animated from "react-native-reanimated";
import { StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Wave = () => {
  const from = { x: 0, y: 0.3 };
  const c1 = { x: 0, y: 0.5 };
  const c2 = { x: 1, y: 0.5 };
  const to = { x: 1, y: 0.7 };
  const d = `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`;
  return (
    <Svg width={width} height={width} viewBox="0 0 1 1">
      <AnimatedPath d={d} fill={StyleGuide.palette.primary} />
      <Circle r={0.05} fill="red" cy={c1.y} cx={c1.x} />
      <Circle r={0.05} fill="red" cy={c2.y} cx={c2.x} />
      <Line
        x1={c1.x}
        y1={c1.y}
        x2={c2.x}
        y2={c2.y}
        stroke="red"
        strokeWidth={0.01}
      />
      <Circle r={0.05} fill="blue" cy={from.y} cx={from.x} />
      <Circle r={0.05} fill="blue" cy={to.y} cx={to.x} />
    </Svg>
  );
};

export default Wave;
