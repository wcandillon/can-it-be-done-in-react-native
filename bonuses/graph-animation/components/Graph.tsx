import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { scaleTime, scaleLinear } from "d3-scale";
import * as shape from "d3-shape";

import Cursor from "./Cursor";

interface DataPoint {
  date: number;
  value: number;
}

interface GraphProps {
  data: DataPoint[];
}

const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get("window");
const height = (1 - 1 / φ) * wHeight;
const strokeWidth = 4;
const padding = strokeWidth / 2;
const CURSOR_RADIUS = 8;
const STROKE_WIDTH = CURSOR_RADIUS / 2;
const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain)
];

export default ({ data }: GraphProps) => {
  const scaleX = scaleTime()
    .domain(getDomain(data.map(d => d.date)))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map(d => d.value)))
    .range([height - padding, padding]);
  const d = shape
    .line<DataPoint>()
    .x(p => scaleX(p.date))
    .y(p => scaleY(p.value))
    .curve(shape.curveBasis)(data) as string;
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <Stop offset="0%" stopColor="#cee3f9" />
            <Stop offset="80%" stopColor="#ddedfa" />
            <Stop offset="100%" stopColor="#feffff" />
          </LinearGradient>
        </Defs>
        <Path
          d={`${d}L ${width} ${height} L 0 ${height}`}
          fill="url(#gradient)"
        />
        <Path fill="transparent" stroke="#3977e3" {...{ d, strokeWidth }} />
      </Svg>
      <Cursor
        r={CURSOR_RADIUS}
        borderWidth={STROKE_WIDTH}
        borderColor="#3977e3"
        {...{ d }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height
  }
});
