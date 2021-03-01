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
  const height = mix(progress, SIZE, 2 * SIZE);
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
  /*
  return [
    `M 0 ${R}`,
    // Top Left Corner
    arcTo(R, 0),
    `H ${width - R}`,
    // Top Right Corner
    arcTo(width, R),
    `V ${height - SIZE - R}`,
    // Bottom Right Corner
    arcTo(width - R, height - SIZE),
    `H ${width / 2 + SIZE / 2 + R}`,
    // Button Top Right Corner
    arcTo(width / 2 + SIZE / 2, height - SIZE + R, true),
    `V ${height - R}`,
    // Button Bottom Right Corner
    arcTo(width / 2 + SIZE / 2 - R, height),
    `H ${width / 2 - SIZE / 2 + R}`,
    // Button Bottom Left Corner
    arcTo(width / 2 - SIZE / 2, height - R),
    `V ${height - SIZE + R}`,
    // Button Top Left Corner
    arcTo(width / 2 - SIZE / 2 - R, height - SIZE, true),
    `H ${R}`,
    // Bottom Left Corner
    arcTo(0, height - SIZE - R),
    "Z",
  ].join("");
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
          <Svg width={WIDTH} height={HEIGHT} style={{ backgroundColor: "red" }}>
            <AnimatedPath animatedProps={animatedProps} fill={"#02CBD6"} />
          </Svg>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tabbar;
