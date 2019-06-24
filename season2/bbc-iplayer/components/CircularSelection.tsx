import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

import { Channel } from "./Model";

const { width, height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;
const D = width * φ;
const R = D / 2;
const circle = (r: number, cx: number, cy: number) => `M ${cx - R}, ${cy}
a ${r},${r} 0 1,0 ${r * 2},0
a ${r},${r} 0 1,0 ${-r * 2},0`;

interface CircularSelectionProps {
  channels: Channel[];
}

export default ({ channels }: CircularSelectionProps) => {
  const l = Math.sin(Math.PI / channels.length);
  const r = (R * l) / (1 - l);
  const d = circle(R, width / 2, height / 2);
  return (
    <Svg width={width} height={width}>
      <Defs>
        <LinearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="50%">
          <Stop offset="0" stopColor="#353637" />
          <Stop offset="1" stopColor="#1c1d1e" />
        </LinearGradient>
      </Defs>
      <Path fill="url(#bg)" {...{ d }} />
    </Svg>
  );
};
