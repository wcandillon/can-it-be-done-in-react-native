import React from "react";
import { Dimensions } from "react-native";
import { Circle, Text } from "react-native-svg";
import { Vector, canvas2Polar, polar2Canvas } from "react-native-redash";

const { width, height } = Dimensions.get("window");
export const RADIUS = width * 0.4;
export const STROKE_WIDTH = (2 * RADIUS) / 5;
export const PADDING = 10;
export const center = { x: width / 2, y: height / 2 };

const vec = (x: number, y: number) => ({ x, y });

const rotate = (tr: Vector, origin: Vector, rotation: number) => {
  const { radius, theta } = canvas2Polar(tr, origin);
  return polar2Canvas({ radius, theta: theta + rotation }, origin);
};

export const DIGITS = new Array(10)
  .fill(0)
  .map((_, i) =>
    rotate(
      vec(center.x + RADIUS - STROKE_WIDTH / 2, center.y),
      center,
      (i * Math.PI) / 6.5
    )
  );

const Quadrant = () => {
  return (
    <>
      <Circle fill="black" cx={center.x} cy={center.y} r={RADIUS} />
      <Circle fill="red" cx={center.x} cy={center.y} r={2} />
      {DIGITS.map(({ x, y }, i) => (
        <Text
          key={i}
          fontSize={32}
          fill="white"
          x={x}
          y={y}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {i}
        </Text>
      ))}
    </>
  );
};

export default Quadrant;
