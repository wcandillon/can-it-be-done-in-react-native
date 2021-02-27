/* eslint-disable max-len */
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { clamp, interpolatePath, mix, parse } from "react-native-redash";
import Svg, { Path } from "react-native-svg";
import { Feather as Icon } from "@expo/vector-icons";

import StaticTabbar from "./StaticTabbar";
import Row from "./Row";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface TabbarProps {
  open: Animated.SharedValue<number>;
}

const SIZE = 100;
const R = SIZE / 4;
console.log({ SIZE });
// 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
const C = R * 0.5522847498;
const A = Math.PI / 4;
const X = Math.cos(A) * C;
const Y = Math.sin(A) * C;
const p1 = { x: 0, y: R };
const p2 = { x: R, y: 0 };
const p3 = { x: SIZE - R };
const d1 = [
  `M 0 ${R}`,
  `C 0 ${R - C} ${R - C} 0 ${R} 0`,
  `H ${SIZE - R}`,
  `C ${SIZE - R + C} 0 ${SIZE} ${R - C} ${SIZE} ${R}`,
  `V ${SIZE - R}`,
  `C ${SIZE} ${SIZE - R + C} ${SIZE - R + C} ${SIZE} ${SIZE - R} ${SIZE}`,
  `H ${R}`,
  `C ${R - C} ${SIZE} 0 ${SIZE - R + C} 0 ${SIZE - R}`,
  "Z",
].join(" ");

const arcTo = (x: number, y: number) => `A ${R} ${R} 0 0 1 ${x} ${y}`;

const d = [
  `M 0 ${R}`,
  arcTo(R, 0),
  `H ${SIZE - R}`,
  arcTo(SIZE, R),
  `V ${SIZE - R}`,
  arcTo(SIZE - R, SIZE),
  `H ${R}`,
  arcTo(0, SIZE - R),
  "Z",
].join(" ");

const Tabbar = ({ open }: TabbarProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        open.value = withTiming(open.value === 1 ? 0 : 1);
      }}
    >
      <View>
        <StaticTabbar />
        <View style={styles.overlay}>
          <Svg width={SIZE} height={SIZE}>
            <Path d={d} fill={"#02CBD6"} />
          </Svg>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tabbar;
