import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, {Path} from "react-native-svg";

import {Channel} from "./Model";

const {width, height} = Dimensions.get("window");
// const φ = (1 + Math.sqrt(5)) / 2;
const D = (width * 1.4);
const R = D / 2;
const circle = (r: number, cx: number, cy: number) => `M ${cx - R}, ${cy}
a ${r},${r} 0 1,0 ${r * 2},0
a ${r},${r} 0 1,0 ${-r * 2},0`;

interface CircularSelectionProps {
  channels: Channel[];
}

export default ({channels}: CircularSelectionProps) => {
  const l = Math.sin(Math.PI / channels.length);
  const r = (R * l) / (1 - l);
  const cx = r;
  const cy = r;
  const d = circle(R, width / 2, height / 2);
  return (
      <Svg width={width} height={width}>
        <Path {...{d}} />
      </Svg>
  );
}
