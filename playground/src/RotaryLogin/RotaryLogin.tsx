import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, G, Mask } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  createAnimatedPropAdapter,
} from "react-native-reanimated";
import {
  Matrix3,
  processTransform2d,
  toDeg,
  Transforms2d,
  Vector,
} from "react-native-redash";

import { transformOrigin } from "../components/Animations/Transform";

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

const RotaryLogin = () => {
  const theta = useSharedValue(0);
  const r = RADIUS - STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * r;
  const animatedProps = useAnimatedProps(() => {
    return {
      transform: transformOrigin(center, [{ rotate: -theta.value }]),
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <Svg style={styles.container}>
        <Defs>
          <Mask id="mask">
            {DIGITS.slice(0, 10).map(({ x, y }, i) => {
              const props = useAnimatedProps(() => {
                return {
                  transform: transformOrigin(center, [
                    { rotate: -theta.value },
                  ]),
                };
              });
              return (
                <AnimatedCircle
                  key={i}
                  cx={x}
                  cy={y}
                  r={STROKE_WIDTH / 2 - PADDING}
                  fill="white"
                  animatedProps={props}
                />
              );
            })}
          </Mask>
        </Defs>
        <Quadrant />
        <Circle
          fill="white"
          cx={center.x}
          cy={center.y}
          r={RADIUS - STROKE_WIDTH}
        />
        <AnimatedCircle
          cx={center.x}
          cy={center.y}
          r={r}
          strokeWidth={STROKE_WIDTH - PADDING}
          stroke="white"
          strokeDasharray={[circumference, circumference]}
          strokeDashoffset={-0.305 * circumference}
          strokeLinecap="round"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          animatedProps={animatedProps}
        />
        <AnimatedG mask="url(#mask)">
          <Quadrant />
        </AnimatedG>
      </Svg>
      <Gesture theta={theta} />
    </View>
  );
};

export default RotaryLogin;
