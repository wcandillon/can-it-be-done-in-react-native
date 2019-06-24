import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

import { Channel } from "./Model";

const { width } = Dimensions.get("window");
const D = width * 1.2;
const R = D / 2;
const circle = (r: number, cx: number, cy: number) => `M ${cx - r}, ${cy}
a ${r},${r} 0 1,0 ${r * 2},0
a ${r},${r} 0 1,0 ${-r * 2},0`;
const styles = StyleSheet.create({
  container: {
    width,
    height: width / 1.4
  }
});

interface CircularSelectionProps {
  channels: Channel[];
}

export default ({ channels }: CircularSelectionProps) => {
  const l = Math.sin(Math.PI / channels.length);
  const r = (R * l) / (1 - l);
  const R1 = R + 2 * r;
  const d = circle(R1, R1 - (R1 - width / 2), R1);
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="50%">
            <Stop offset="0" stopColor="#353637" />
            <Stop offset="1" stopColor="#1c1d1e" />
          </LinearGradient>
        </Defs>
        <Path fill="#3498db" {...{ d }} />
      </Svg>
      <View style={StyleSheet.absoluteFill}>
        {channels.map((channel, index) => (
          <View key={index} />
        ))}
      </View>
    </View>
  );
};
