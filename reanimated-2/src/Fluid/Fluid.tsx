import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

import { cartesian2Canvas } from "../components/AnimatedHelpers";

import { createSVGPath, moveTo, curveTo, serialize } from "./Path";

const { width } = Dimensions.get("window");
const SIZE = width * 0.61;
const C = 0.551915024494;
const CENTER = { x: 1, y: 1 };
const AnimatedPath = Animated.createAnimatedComponent(Path);
const slides = [{}, {}, {}];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
});

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

/*
https://spencermortensen.com/articles/bezier-circle/

P0 = (0, 1), P1 = (C, 1), P2 = (1, C), P3 = (1, 0)
P0 = (1, 0), P1 = (1, -C), P2 = (C, -1), P3 = (0, -1)
P0 = (0, -1), P1 = (-C, -1), P2 = (-1, -C), P4 = (-1, 0)
P0 = (-1, 0), P1 = (-1, C), P2 = (-C, 1), P3 = (0, 1)
*/

const Fluid = () => {
  const x = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const animatedProps = useAnimatedProps(() => {
    const value = (x.value / width) % 1;
    console.log({ value, width });
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
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      snapToInterval={width}
      decelerationRate="fast"
      horizontal
    >
      {slides.map((_slide, index) => (
        <View key={index} style={styles.container}>
          <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
            <AnimatedPath fill="#D5E4FF" animatedProps={animatedProps} />
          </Svg>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export default Fluid;
