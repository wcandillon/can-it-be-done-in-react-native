import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import Color from "color";
import { Feather as Icon } from "@expo/vector-icons";

export const STROKE_WIDTH = 40;
const { PI } = Math;
const { multiply, sub } = Animated;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
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
}

export default ({ color, size, progress, icon }: CircularProgressProps) => {
  const r = (size - STROKE_WIDTH) / 2;
  const circumference = r * 2 * PI;
  const α = multiply(sub(1, progress), PI * 2);
  const strokeDashoffset = multiply(α, r);
  const backgroundColor = new Color(color).darken(0.8);
  const cx = size / 2;
  const cy = size / 2;
  return (
    <View style={styles.container}>
      <Svg style={styles.svg} width={size} height={size}>
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
        <AnimatedCircle
          stroke={color}
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeLinecap="round"
          strokeWidth={STROKE_WIDTH}
          {...{
            strokeDashoffset,
            cx,
            cy,
            r
          }}
        />
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
