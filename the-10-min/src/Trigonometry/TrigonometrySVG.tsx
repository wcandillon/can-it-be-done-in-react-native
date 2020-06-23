import React from "react";
import { Dimensions, PixelRatio } from "react-native";
import Svg, { Circle, G, Line } from "react-native-svg";
import { mix, polar2Canvas, useLoop, vec } from "react-native-redash";
import Animated, { add, divide } from "react-native-reanimated";
import Constants from "expo-constants";

const dist = (v1, v2) => {
  const v = vec.sub(v1, v2);
};

const { width, height } = Dimensions.get("window");
const strokeWidth = 3;
const stroke = "black";
const radius = PixelRatio.roundToNearestPixel(width / 2);
const paddingTop = 45 + Constants.statusBarHeight + (height - radius * 2) / 4;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const lRadius = 25;
const colors = [
  "#2D4CD2",
  "#36B6D9",
  "#3CF2B5",
  "#37FF5E",
  "#59FB2D",
  "#AFF12D",
  "#DABC2D",
  "#D35127",
  "#D01252",
  "#CF0CAA",
  "#A80DD8",
  "#5819D7",
];

const Trigonometry = () => {
  const progress = useLoop(4000, false);
  const theta = mix(progress, 0, 2 * Math.PI);
  const { x, y } = polar2Canvas({ theta, radius }, { x: radius, y: radius });
  return (
    <Svg {...{ width, height }}>
      <G transform={`translate(0 ${paddingTop})`} {...{ stroke, strokeWidth }}>
        <Circle cx={radius} cy={radius} r={radius} fill="transparent" />
        <Circle cx={radius} cy={radius} r={radius / 2} fill="transparent" />
        <Line x1={radius} y1={0} x2={radius} y2={radius * 2} />
        <Line x1={0} y1={radius} x2={radius * 2} y2={radius} />
        <AnimatedLine x1={x} y1={radius} x2={radius} y2={y} />
        <AnimatedCircle cx={x} cy={y} r={lRadius} fill={colors[0]} />
        <AnimatedCircle cx={x} cy={radius} r={lRadius} fill={colors[1]} />
        <AnimatedCircle cx={radius} cy={y} r={lRadius} fill={colors[2]} />
        <AnimatedCircle
          cx={add(radius / 2, divide(x, 2))}
          cy={add(radius / 2, divide(y, 2))}
          r={lRadius}
          fill={colors[3]}
        />
      </G>
    </Svg>
  );
};

export default Trigonometry;
