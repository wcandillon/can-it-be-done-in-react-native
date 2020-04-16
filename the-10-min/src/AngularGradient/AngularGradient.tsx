import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import interpolate from "color-interpolate";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";
import Animated from "react-native-reanimated";
import { StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const { PI, cos, sin } = Math;
const { multiply, sub, Value } = Animated;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const colors = [StyleGuide.palette.primary, "#c0392b"];
const palette = interpolate(colors);
const size = width * 0.8;
const strokeWidth = 20;
const r = size / 2 - strokeWidth / 2;
const cx = size / 2;
const cy = size / 2;
const A = 2 * PI;
const sampling = 2;
const step = A / sampling;
const x = (α: number) => cx - r * cos(α);
const y = (α: number) => -r * sin(α) + cy;
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
const arc = (α: number) => `A ${r} ${r} 0 0 1 ${x(α)} ${y(α)}`;
const arcs = new Array(sampling).fill(0).map((_0, i) => {
  const α = i * step;
  return `M ${x(α)} ${y(α)} ${arc(α + step)}`;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    transform: [{ rotateZ: "-90deg" }],
  },
});

export default () => {
  const progress = new Value(0.5);
  const transition = new Value(0.5);
  const circumference = r * 2 * PI;
  const α = multiply(sub(1, multiply(progress, transition)), PI * 2);
  const strokeDashoffset = sub(circumference, multiply(α, -r));
  return (
    <View style={styles.container}>
      <Svg style={styles.svg} width={size} height={size}>
        <Defs>
          {arcs.map((_d, key) => {
            const isReversed = key / sampling >= 0.5;
            return (
              <LinearGradient key={key} id={`gradient-${key}`}>
                <Stop
                  stopColor={palette(key / sampling)}
                  offset={`${isReversed ? 100 : 0}%`}
                />
                <Stop
                  stopColor={palette((key + 1) / sampling)}
                  offset={`${isReversed ? 0 : 100}%`}
                />
              </LinearGradient>
            );
          })}
        </Defs>
        <G
          transform={`translate(${cx}, ${cy}) rotate(180) translate(${-cx}, ${-cy})`}
        >
          {arcs.map((d, key) => (
            <Path
              key={key}
              fill="transparent"
              stroke={`url(#gradient-${key})`}
              {...{ strokeWidth, d }}
            />
          ))}
        </G>
        <AnimatedCircle
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{ strokeWidth, strokeDashoffset, r, cx, cy }}
        />
      </Svg>
    </View>
  );
};
