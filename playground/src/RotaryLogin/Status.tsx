import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
  withDelay,
  interpolateColor,
} from "react-native-reanimated";
import { Circle } from "react-native-svg";
import { bin, transformOrigin } from "react-native-redash";

import { center, RADIUS } from "./Quadrant";

const { width } = Dimensions.get("window");
const r = 8;
const cx = width - (center.x - RADIUS);
const cy = center.y - RADIUS - 50;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Digit {
  passcode: Animated.SharedValue<string>;
  i: number;
}

const Digit = ({ passcode, i }: Digit) => {
  const transition = useSharedValue(0);
  const endTransition = useSharedValue(0);
  const origin = { x: cx - i * 3 * r, y: cy };
  const animatedProps = useAnimatedProps(() => ({
    opacity: transition.value,
    transform: transformOrigin(origin, [{ scale: transition.value }]),
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    fill: interpolateColor(
      bin(passcode.value === "0000"),
      [0, 1],
      ["#e74c3c", "#2ecc71"]
    ),
    opacity: endTransition.value,
    transform: transformOrigin(origin, [{ scale: endTransition.value }]),
  }));
  useAnimatedReaction(
    () => passcode.value.length,
    (l) => {
      if (l === 4) {
        endTransition.value = withTiming(
          1,
          { duration: 650, easing: Easing.inOut(Easing.ease) },
          () => {
            endTransition.value = withDelay(
              2000,
              withTiming(0, { duration: 100 }, () => (passcode.value = ""))
            );
          }
        );
      }
      transition.value = withTiming(l > i ? 1 : 0);
    }
  );
  return (
    <>
      <Circle
        cx={origin.x}
        cy={origin.y}
        r={r}
        fill="black"
        stroke="black"
        strokeWidth={4}
      />
      <AnimatedCircle
        cx={origin.x}
        cy={origin.y}
        r={r - 2}
        fill="white"
        animatedProps={animatedProps}
      />
      <AnimatedCircle
        cx={origin.x}
        cy={origin.y}
        r={r - 2}
        animatedProps={animatedProps2}
      />
    </>
  );
};

interface StatusProps {
  passcode: Animated.SharedValue<string>;
}

const Status = ({ passcode }: StatusProps) => {
  return (
    <>
      {new Array(4).fill(0).map((_, i) => (
        <Digit key={i} i={i} passcode={passcode} />
      ))}
    </>
  );
};

export default Status;
