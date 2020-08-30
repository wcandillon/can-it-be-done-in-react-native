import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";
import Animated, {
  repeat,
  useDerivedValue,
  withTiming,
  useAnimatedProps,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { StyleGuide } from "../components";
import { mix } from "../components/AnimatedHelpers";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Wave = () => {
  const progress = useSharedValue(0);
  const wave = useDerivedValue(() => ({
    from: {
      x: mix(progress.value, -0.1, -1),
      y: mix(progress.value, 0.2, 0.5),
    },
    c1: { x: mix(progress.value, 0, 0.5), y: mix(progress.value, 0.7, 1) },
    c2: { x: mix(progress.value, 1, 0.5), y: mix(progress.value, 0.3, 0) },
    to: { x: mix(progress.value, 1.1, 2), y: mix(progress.value, 0.8, 0.5) },
  }));
  const path = useAnimatedProps(() => {
    const { from, c1, c2, to } = wave.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });
  const c1 = useAnimatedProps(() => {
    const { x, y } = wave.value.c1;
    return {
      cx: x,
      cy: y,
    };
  });
  const c2 = useAnimatedProps(() => {
    const { x, y } = wave.value.c2;
    return {
      cx: x,
      cy: y,
    };
  });
  const from = useAnimatedProps(() => {
    const { x, y } = wave.value.from;
    return {
      cx: x,
      cy: y,
    };
  });
  const to = useAnimatedProps(() => {
    const { x, y } = wave.value.to;
    return {
      cx: x,
      cy: y,
    };
  });
  useEffect(() => {
    progress.value = repeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [progress]);
  return (
    <Svg width={width} height={width} viewBox="0 0 1 1">
      <AnimatedPath animatedProps={path} fill={StyleGuide.palette.primary} />
      <AnimatedCircle r={0.05} fill="red" animatedProps={from} />
      <AnimatedCircle r={0.05} fill="red" animatedProps={to} />
      <AnimatedCircle r={0.05} fill="blue" animatedProps={c1} />
      <AnimatedCircle r={0.05} fill="blue" animatedProps={c2} />
    </Svg>
  );
};

export default Wave;
