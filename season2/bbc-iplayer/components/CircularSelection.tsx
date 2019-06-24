import * as React from 'react';
import { View } from 'react-native';
import Svg, {Path} from "react-native-svg";

import {Channel} from "./Model";

const ICON_SIZE = 40;

interface CircularSelectionProps {
  channels: Channel[]
}

export default ({channels}: CircularSelectionProps) => {
  const circumference = channels.length * ICON_SIZE;
  const r = circumference / (2 * Math.PI);
  const cx = r;
  const cy = r;
  const d = `M ${cx - r}, ${cy}
  a ${r},${r} 0 1,0 ${r * 2},0
  a ${r},${r} 0 1,0 ${-r * 2},0`;
  return (
    <View>
      <Svg style={{ flex: 1 }}>
        <Path {...{d}} />
      </Svg>
    </View>
  );
}
