import * as React from "react";
import { Dimensions } from "react-native";
import { Svg } from "expo";
import SVGPath from "art/modes/svg/path";

const { width } = Dimensions.get("window");
const size = width - 32;
const radius = size / 2;
const {
  Defs, LinearGradient, Stop, Path,
} = Svg;
const padding = 25;
const d = SVGPath()
  .moveTo(0, radius)
  .arcTo(radius, 0, radius)
  .arcTo(radius * 2, radius, radius)
  .arcTo(radius, radius * 2, radius)
  .arcTo(0, radius, radius)
  .toSVG();
const start = "#f5cb44";
const end = "#ef9837";
// interface SliderProps {}

export default () => (
  <Svg width={size} height={size}>
    <Defs>
      <LinearGradient id="grad" x1="0" y1="0" x2={2 * radius} y2="0">
        <Stop offset="0" stopColor={start} stopOpacity="1" />
        <Stop offset="1" stopColor={end} stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Path
      strokeWidth={padding * 2}
      stroke="url(#grad)"
      fill="none"
      {...{ d }}
    />
  </Svg>
);
