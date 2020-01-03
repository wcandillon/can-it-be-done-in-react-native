import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import Color from "color";
import { Feather as Icon } from "@expo/vector-icons";

import Layer, { STROKE_WIDTH } from "./Layer";

export { STROKE_WIDTH };
const { PI } = Math;
const { multiply, sub } = Animated;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  svg: {
    transform: [{ rotateZ: "270deg" }]
  }
});

interface CircularProgressProps {
  icon: string;
  color: string;
  size: number;
  progress: Animated.Node<number>;
  maxProgress: number;
}

export default ({
  color,
  size,
  progress,
  icon,
  maxProgress
}: CircularProgressProps) => {
  const layers = Math.ceil(maxProgress);
  const r = (size - STROKE_WIDTH) / 2;
  const backgroundColor = new Color(color).darken(0.8);
  const cx = size / 2;
  const cy = size / 2;
  return (
    <View style={styles.container}>
      <Svg style={styles.svg} width={size} height={size}>
        <Defs>
          <RadialGradient
            cx="50%"
            cy="50%"
            fx="50%"
            fy="50%"
            r="50%"
            id="linecap-shadow"
          >
            <Stop offset="0%" />
            <Stop offset="50%" stopColor="black" />
            <Stop stopColor="black" stopOpacity={0} offset="100%" />
          </RadialGradient>
        </Defs>
        <Circle
          stroke={backgroundColor.string()}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          {...{
            cx,
            cy,
            r
          }}
        />
        {new Array(layers).fill(0).map((_, i) => (
          <Layer
            key={i}
            hasStartingLineCap={i === 0}
            progress={interpolate(progress, {
              inputRange: [i, i + 1],
              outputRange: [0, 1],
              extrapolate: Extrapolate.CLAMP
            })}
            //            color={new Color(color).darken(0.1 * i).string()}
            {...{
              color,
              cx,
              cy,
              r,
              size
            }}
          />
        ))}
      </Svg>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon
          name={icon}
          style={{ top: -r }}
          color="black"
          size={STROKE_WIDTH}
        />
      </View>
    </View>
  );
};
