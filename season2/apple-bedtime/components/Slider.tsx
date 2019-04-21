import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { Svg, DangerZone } from "expo";
import SVGPath from "art/modes/svg/path";

import Cursor from "./Cursor";

const { Animated } = DangerZone;
const { Value } = Animated;

const { width } = Dimensions.get("window");
const size = width - 32;
const padding = 25;
const radius = size / 2 - padding;
const {
  Defs, LinearGradient, Stop, Path,
} = Svg;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const d = SVGPath()
  .moveTo(padding, radius + padding)
  .arcTo(radius + padding, padding, radius)
  .arcTo(radius * 2 + padding, radius + padding, radius)
  .arcTo(radius + padding, radius * 2 + padding, radius)
  .arcTo(padding, radius + padding, radius)
  .toSVG();

export default () => {
  const strokeDasharray = new Value(0); // Math.PI * radius
  const strokeDashoffset = new Value(0); // radius
  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#f7cd46" />
            <Stop offset="1" stopColor="#ef9837" />
          </LinearGradient>
        </Defs>
        <AnimatedPath
          strokeWidth={padding * 2}
          stroke="url(#grad)"
          fill="none"
          {...{ d, strokeDasharray, strokeDashoffset }}
        />
      </Svg>
      <Cursor />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
  },
});
