/* eslint-disable max-len */
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { clamp, interpolatePath, mix, parse } from "react-native-redash";
import Svg, { Path } from "react-native-svg";
import { Feather as Icon } from "@expo/vector-icons";

import StaticTabbar from "./StaticTabbar";
import Row from "./Row";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

interface TabbarProps {
  open: Animated.SharedValue<number>;
}

const SIZE = 100;
const R = SIZE / 4;

const arcTo = (x: number, y: number, reverse = false) => {
  "worklet";
  return `A ${R} ${R} 0 0 ${reverse ? "0" : "1"} ${x} ${y}`;
};

const WIDTH = 3.14 * SIZE;
const HEIGHT = 3.5 * SIZE;

const d = (progress: number) => {
  "worklet";
  const height = mix(progress, SIZE, HEIGHT);
  const width = interpolate(
    height,
    [SIZE, 2 * SIZE, HEIGHT],
    [SIZE, SIZE, WIDTH]
  );
  const bottomLeft =
    width <= SIZE
      ? []
      : [
          // Bottom Left
          arcTo(WIDTH / 2 - SIZE / 2 - R, HEIGHT - SIZE, true),
          `H ${(WIDTH - width) / 2 + R}`,
          arcTo((WIDTH - width) / 2, HEIGHT - SIZE - R),
        ];
  const bottomRight =
    width <= SIZE
      ? []
      : [
          // Bottom Right
          arcTo(WIDTH - (WIDTH - width) / 2 - R, HEIGHT - SIZE),
          `H ${WIDTH / 2 + SIZE / 2 + R}`,
          arcTo(WIDTH / 2 + SIZE / 2, HEIGHT - SIZE + R, true),
        ];
  return [
    `M ${WIDTH / 2 - SIZE / 2 + R} ${HEIGHT}`,
    // Button Bottom Left Corner
    arcTo(WIDTH / 2 - SIZE / 2, HEIGHT - R),
    `V ${HEIGHT - SIZE + R}`,
    ...bottomLeft,
    `V ${HEIGHT - height + R}`,
    // Top Left Corner
    arcTo((WIDTH - width) / 2 + R, HEIGHT - height),
    `H ${WIDTH - (WIDTH - width) / 2 - R}`,
    //Top Right Corner
    arcTo(WIDTH - (WIDTH - width) / 2, HEIGHT - height + R),
    `V ${HEIGHT - SIZE - R}`,
    ...bottomRight,
    `V  ${HEIGHT - R}`,
    // Buttom Bottom Right Corner
    arcTo(WIDTH / 2 + SIZE / 2 - R, HEIGHT),
    "Z",
  ].join(" ");
  /*
  Part 1
     return [
    `M ${WIDTH / 2 - SIZE / 2 + R} ${HEIGHT}`,
    // Button Bottom Left Corner
    arcTo(WIDTH / 2 - SIZE / 2, HEIGHT - R),
    `V ${HEIGHT - height + R}`,
    // Button Top Left Corner
    arcTo(WIDTH / 2 - SIZE / 2 + R, HEIGHT - height),
    `H ${WIDTH / 2 + SIZE / 2 - R}`,
    // Button Top Right Corner
    arcTo(WIDTH / 2 + SIZE / 2, HEIGHT - height + R),
    `V ${HEIGHT - R}`,
    // Buttom Bottom Right Corner
    arcTo(WIDTH / 2 + SIZE / 2 - R, HEIGHT),
    "Z",
  ].join(" ");
  */
};

const Tabbar = ({ open }: TabbarProps) => {
  const animatedProps = useAnimatedProps(() => ({
    d: d(open.value),
  }));
  useEffect(() => {
    open.value = withRepeat(withTiming(1, { duration: 5000 }), -1, true);
  }, [open]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        open.value = withTiming(open.value === 1 ? 0 : 1);
      }}
    >
      <View>
        <StaticTabbar />
        <View style={styles.overlay}>
          <Svg width={WIDTH} height={HEIGHT}>
            <AnimatedPath animatedProps={animatedProps} fill={"#02CBD6"} />
          </Svg>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tabbar;
