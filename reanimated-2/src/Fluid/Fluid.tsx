import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { createSVGPath, moveTo, curveTo, close, serialize } from "./Path";

const { width } = Dimensions.get("window");
const SIZE = width - 64;
const C = ((4 / 3) * Math.tan(Math.PI / 8)) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const path = createSVGPath();
moveTo(path, 0, 0.5);
curveTo(path, {
  c2: { x: 0.5 - C, y: 0 },
  c1: { x: 0.5 + C, y: 0 },
  to: { x: 0.5, y: 0 },
});
curveTo(path, {
  c2: { x: 1, y: 0.5 - C },
  c1: { x: 1, y: 0.5 + C },
  to: { x: 1, y: 0.5 },
});
curveTo(path, {
  c2: { x: 0.5 + C, y: 1 },
  c1: { x: 0.5 - C, y: 1 },
  to: { x: 0.5, y: 1 },
});
curveTo(path, {
  c1: { x: 0, y: 0.5 - C },
  c2: { x: 0, y: 0.5 + C },
  to: { x: 0, y: 0.5 },
});
close(path);
const d = serialize(path);

const Fluid = () => {
  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 1 1">
        <Circle r={0.05} fill="red" cx={0.5} cy={0} />
        <Circle r={0.05} fill="red" cx={1} cy={0.5} />
        <Circle r={0.05} fill="red" cx={0.5} cy={1} />
        <Circle r={0.05} fill="red" cx={0} cy={0.5} />

        <Circle r={0.05} fill="green" cx={0} cy={0.5 - C} />
        <Circle r={0.05} fill="green" cx={0} cy={0.5 + C} />

        <Circle r={0.05} fill="green" cy={1} cx={0.5 + C} />
        <Circle r={0.05} fill="green" cy={1} cx={0.5 - C} />

        <Circle r={0.05} fill="green" cy={0.5 + C} cx={1} />
        <Circle r={0.05} fill="green" cy={0.5 - C} cx={1} />

        <Circle r={0.05} fill="green" cy={0} cx={0.5 + C} />
        <Circle r={0.05} fill="green" cy={0} cx={0.5 - C} />
        <Path fill="rgba(100, 200, 300, 0.5)" d={d} />
      </Svg>
    </View>
  );
};

export default Fluid;
