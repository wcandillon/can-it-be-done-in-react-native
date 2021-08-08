import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, G, Mask } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  SVGAdapter,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Matrix3,
  processTransform2d,
  toDeg,
  Transforms2d,
  Vector,
} from "react-native-redash";

import Quadrant, {
  STROKE_WIDTH,
  RADIUS,
  center,
  DIGITS,
  PADDING,
} from "./Quadrant";
import Gesture from "./Gesture";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
});

export const toSVG = (m: Matrix3) => {
  "worklet";
  return [m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]];
};

export const transformSvg = (transform: Transforms2d) => {
  "worklet";
  return toSVG(processTransform2d(transform));
};

export const transformOrigin = (
  { x, y }: Vector,
  transformations: Transforms2d
): Transforms2d => {
  "worklet";
  return [
    { translateX: x },
    { translateY: y },
    ...transformations,
    { translateX: -x },
    { translateY: -y },
  ];
};

const RotaryLogin = () => {
  const theta = useSharedValue(0);

  const r = RADIUS - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * r;
  const animatedProps = useAnimatedProps(
    () => {
      console.log(theta.value);
      return {
        transform: transformSvg(
          transformOrigin(center, [{ rotate: theta.value }])
        ),
      };
    },
    null,
    [SVGAdapter]
  );
  return (
    <View style={{ flex: 1 }}>
      <Svg style={styles.container}>
        <Defs>
          <Mask id="mask">
            {DIGITS.map(({ x, y }, i) => (
              <Circle
                key={i}
                cx={x}
                cy={y}
                r={STROKE_WIDTH / 2 - PADDING}
                fill="white"
              />
            ))}
          </Mask>
        </Defs>
        <Quadrant />
        <Circle
          fill="white"
          cx={center.x}
          cy={center.y}
          r={RADIUS - STROKE_WIDTH}
        />
        <AnimatedG animatedProps={animatedProps}>
          <Circle
            cx={center.x}
            cy={center.y}
            r={r}
            strokeWidth={STROKE_WIDTH - PADDING}
            stroke="white"
            strokeDasharray={[circumference, circumference]}
            strokeDashoffset={-0.25 * circumference}
            strokeLinecap="round"
          />
        </AnimatedG>
        <G mask="url(#mask)">
          <Quadrant />
        </G>
      </Svg>
      <Gesture theta={theta} />
    </View>
  );
};

export default RotaryLogin;
