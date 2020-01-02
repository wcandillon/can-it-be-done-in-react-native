import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import Animated from "react-native-reanimated";
import { polar2Canvas, polar2Cartesian } from "./AnimatedHelpers";

const { width } = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const center = {
  x: size / 2,
  y: size / 2
};
const startAngle = 0;
const endAngle = PI + 0.99 * PI;
const a3 = 2.5 * PI;
const { x: x1, y: y1 } = polar2Canvas({ alpha: startAngle, radius: r }, center);
const { x: x2, y: y2 } = polar2Canvas({ alpha: endAngle, radius: r }, center);
const { x: x3, y: y3 } = polar2Canvas({ alpha: a3, radius: r }, center);
console.log({ x2, y2 });
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2} A ${r} ${r} 0 1 0 ${x3} ${y3}`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default () => {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Path stroke="white" fill="none" {...{ d, strokeWidth }} />
        <Path stroke="blue" fill="none" {...{ d, strokeWidth }} />
      </Svg>
    </View>
  );
};
