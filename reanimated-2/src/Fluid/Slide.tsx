import React from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

import { cartesian2Canvas } from "../components/AnimatedHelpers";

import { createSVGPath, moveTo, curveTo, serialize } from "./Path";

const { width } = Dimensions.get("window");
const RATIO = 0.75;
const SIZE = width * RATIO;
const C = 0.551915024494;
const CENTER = { x: 1, y: 1 };

const vec = (x: number, y: number) => cartesian2Canvas({ x, y }, CENTER);

const P00 = vec(0, 1);
const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

//const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

//const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C);
const P23 = vec(-1, 0);

// const P30 = vec(-1, 0);
const P31 = vec(-1, C);
const P32 = vec(-C, 1);
const P33 = vec(0, 1);

interface SlideProps {
  x: Animated.SharedValue<number>;
  index: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Slide = ({ x, index }: SlideProps) => {
  const animatedProps = useAnimatedProps(() => {
    const inputRange = [-1 * RATIO, 0, 1 * RATIO];
    const progress = (x.value - width * index) / width;
    if (index === 1) {
      console.log({ progress, width });
    }
    const path = createSVGPath();
    moveTo(path, P00.x, P00.y);
    curveTo(path, {
      c1: P01,
      c2: P02,
      to: P03,
    });
    curveTo(path, {
      c1: P11,
      c2: P12,
      to: P13,
    });
    curveTo(path, {
      c1: P21,
      c2: P22,
      to: P23,
    });
    curveTo(path, {
      c1: P31,
      c2: P32,
      to: P33,
    });
    return { d: serialize(path) };
  });
  return (
    <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
      <AnimatedPath fill="#D5E4FF" animatedProps={animatedProps} />
    </Svg>
  );
};

export default Slide;
