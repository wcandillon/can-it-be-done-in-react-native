import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import MaskedView from "@react-native-community/masked-view";
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
const SIZE = width - 64;
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
  const path1 = useAnimatedProps(() => {
    const p = {
      from: {
        x: mix(1 - progress.value, -0.1, -1),
        y: mix(1 - progress.value, 0.2, 0.5),
      },
      c1: {
        x: mix(1 - progress.value, 0, 0.5),
        y: mix(1 - progress.value, 0.7, 1),
      },
      c2: {
        x: mix(1 - progress.value, 1, 0.5),
        y: mix(1 - progress.value, 0.3, 0),
      },
      to: {
        x: mix(1 - progress.value, 1.1, 2),
        y: mix(1 - progress.value, 0.8, 0.5),
      },
    };
    return {
      d: `M ${p.from.x} ${p.from.y} C ${p.c1.x} ${p.c1.y} ${p.c2.x} ${p.c2.y} ${p.to.x} ${p.to.y} L 1 1 L 0 1 Z`,
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
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaskedView
        maskElement={
          <View
            style={{
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor: "black",
            }}
          />
        }
      >
        <Svg
          width={SIZE}
          height={SIZE}
          viewBox="0 0 1 1"
          style={{ backgroundColor: "#242424" }}
        >
          <AnimatedPath animatedProps={path1} fill="#d5e5ff" />
          <AnimatedPath
            animatedProps={path}
            fill={StyleGuide.palette.primary}
          />
        </Svg>
      </MaskedView>
    </View>
  );
};

export default Wave;
