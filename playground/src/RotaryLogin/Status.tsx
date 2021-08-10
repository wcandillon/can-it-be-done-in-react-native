import React from "react";
import { Dimensions } from "react-native";
import { Circle } from "react-native-svg";

import { center, RADIUS } from "./Quadrant";

const { width } = Dimensions.get("window");
const r = 8;
const cx = width - (center.x - RADIUS);
const cy = center.y - RADIUS - 50;

interface Digit {
  i: number;
}

const Digit = ({ i }: Digit) => {
  const origin = { x: cx - i * 3 * r, y: cy };
  return (
    <>
      <Circle
        cx={origin.x}
        cy={origin.y}
        r={r}
        fill="black"
        stroke="black"
        strokeWidth={4}
      />
    </>
  );
};

interface StatusProps {}

const Status = ({}: StatusProps) => {
  return (
    <>
      {new Array(4).fill(0).map((_, i) => (
        <Digit key={i} i={i} />
      ))}
    </>
  );
};

export default Status;
