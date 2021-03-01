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
import Svg, {
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from "react-native-svg";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import StaticTabbar, { SIZE } from "./StaticTabbar";
import Row from "./Row";

const R = SIZE / 4;
const COLOR = "#02CBD6";
const END_COLOR = "#00B4D4";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: SIZE,
    height: SIZE,
    borderRadius: R,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface TabbarProps {
  open: Animated.SharedValue<number>;
}

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
  return [
    `M ${WIDTH / 2 - SIZE / 2 + R} ${HEIGHT}`,
    // Button Bottom Left Corner
    arcTo(WIDTH / 2 - SIZE / 2, HEIGHT - R),
    `V ${HEIGHT - SIZE + R}`,
    arcTo(WIDTH / 2 - SIZE / 2 - R, HEIGHT - SIZE, true),
    `H ${(WIDTH - width) / 2 + R}`,
    arcTo((WIDTH - width) / 2, HEIGHT - SIZE - R),
    `V ${HEIGHT - height + R}`,
    // Top Left Corner
    arcTo((WIDTH - width) / 2 + R, HEIGHT - height),
    `H ${WIDTH - (WIDTH - width) / 2 - R}`,
    //Top Right Corner
    arcTo(WIDTH - (WIDTH - width) / 2, HEIGHT - height + R),
    `V ${HEIGHT - SIZE - R}`,
    arcTo(WIDTH - (WIDTH - width) / 2 - R, HEIGHT - SIZE),
    `H ${WIDTH / 2 + SIZE / 2 + R}`,
    arcTo(WIDTH / 2 + SIZE / 2, HEIGHT - SIZE + R, true),
    `V  ${HEIGHT - R}`,
    // Buttom Bottom Right Corner
    arcTo(WIDTH / 2 + SIZE / 2 - R, HEIGHT),
    "Z",
  ].join(" ");
};

const Tabbar = ({ open }: TabbarProps) => {
  const insets = useSafeAreaInsets();
  const animatedProps = useAnimatedProps(() => {
    const progress = open.value;
    const height = mix(progress, SIZE, HEIGHT);
    const width = interpolate(
      height,
      [SIZE, 2 * SIZE, HEIGHT],
      [SIZE, SIZE, WIDTH]
    );
    const x = interpolate(width, [SIZE, WIDTH], [(WIDTH - SIZE) / 2, 0]);
    const y = interpolate(height, [SIZE, HEIGHT], [HEIGHT - SIZE, 0]);
    return {
      rx: R,
      ry: R,
      width,
      height,
      x,
      y,
    };
  });
  const icon = useAnimatedStyle(() => ({
    transform: [{ rotate: `${mix(open.value, Math.PI / 4, 0)}rad` }],
  }));
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        open.value = withTiming(open.value === 1 ? 0 : 1);
      }}
    >
      <View>
        <StaticTabbar />
        <View
          style={[styles.overlay, { paddingBottom: insets.bottom }]}
          pointerEvents="none"
        >
          <Svg width={WIDTH} height={HEIGHT}>
            <Defs>
              <LinearGradient
                id="gradient"
                x1={WIDTH / 2}
                y1={0}
                x2={WIDTH / 2}
                y2={HEIGHT}
                gradientUnits="userSpaceOnUse"
              >
                <Stop offset={0} stopColor={END_COLOR} />
                <Stop offset={1} stopColor={COLOR} />
              </LinearGradient>
              <Mask id="mask">
                <AnimatedRect animatedProps={animatedProps} fill="white" />
              </Mask>
            </Defs>

            <Path d={d(1)} fill="url(#gradient)" mask="url(#mask)" />
          </Svg>
        </View>
        <View
          style={[styles.overlay, { paddingBottom: insets.bottom }]}
          pointerEvents="none"
        >
          <Animated.View style={styles.icon}>
            <Animated.View style={icon}>
              <Icon name="x" color="white" size={32} />
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tabbar;
