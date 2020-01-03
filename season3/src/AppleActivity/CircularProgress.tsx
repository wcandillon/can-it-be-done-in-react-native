import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop
} from "react-native-svg";
import interpolateColor from "color-interpolate";
import Color from "color";
import { Feather as Icon } from "@expo/vector-icons";

import Layer, { STROKE_WIDTH } from "./Layer";

export { STROKE_WIDTH };
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
  const palette = interpolateColor([
    new Color(color).lighten(0.5).string(),
    color
  ]);
  const getColor = progress => {
    console.log({ progress });
    return palette(progress);
  };
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
          {new Array(layers).fill(0).map((_, i) => (
            <LinearGradient id={`angular-gradient-${i}-0`} key={`${i}-0`}>
              <Stop stopColor={getColor(0)} offset="100%" />
              <Stop stopColor={getColor(0.5)} offset="0%" />
            </LinearGradient>
          ))}
          {new Array(layers).fill(0).map((_, i) => (
            <LinearGradient id={`angular-gradient-${i}-1`} key={`${i}-1`}>
              <Stop stopColor={getColor(0.5)} offset="0%" />
              <Stop stopColor={getColor(1)} offset="100%" />
            </LinearGradient>
          ))}
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
            index={i}
            key={i}
            hasStartingLineCap={i === 0}
            progress={interpolate(progress, {
              inputRange: [i, i + 1],
              outputRange: [0, 1],
              extrapolate: Extrapolate.CLAMP
            })}
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
