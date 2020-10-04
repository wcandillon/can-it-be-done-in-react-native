import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  repeat,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { clamp, interpolatePath, parse, serialize } from "react-native-redash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";

import StaticTabbar, { SIZE } from "./StaticTabbar";

interface TabbarProps {}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const p1 = parse(
  "M100 225V275C100 288.807 111.193 300 125 300H175C188.807 300 200 288.807 200 275V225C200 211.193 188.81 200 173 200H123C109.19 200 100 211.193 100 225Z"
);
const p2 = parse(
  "M99 225V275C99 288.807 110.193 300 124 300H174C187.807 300 199 288.807 199 275V225C199 211.193 210.193 200 224 200H74C87.8071 200 99 211.193 99 225Z"
);

const p11 = parse(
  "M100 225V275C100 288.807 111.193 300 125 300H175C188.807 300 200 288.807 200 275V225C200 211.193 188.81 200 173 200H123C109.19 200 100 211.193 100 225Z"
);

const p12 = parse(
  "M100 173.5V275C100 288.807 111.193 300 125 300H175C188.807 300 200 288.807 200 275V173.5C200 159.693 190.81 148.5 175 148.5H125C111.19 148.5 100 159.693 100 173.5Z"
);

const p30 = parse(
  "M100 225V275C100 288.807 111.193 300 125 300H175C188.807 300 200 288.807 200 275V225C200 211.193 188.81 200 173 200H123C109.19 200 100 211.193 100 225Z"
);

const p31 = parse(
  "M74 148.901V270.299C74 286.813 90.7893 300.2 111.5 300.2H186.5C207.211 300.2 224 286.813 224 270.299V148.901C224 132.387 210.215 119 186.5 119H111.5C90.785 119 74 132.387 74 148.901Z"
);

const p32 = parse(
  "M0 50V150C0 177.614 7.57864 200 49 200H250.5C291.921 200 300 177.614 300 150V50C300 22.3858 297.93 0 250.5 0H49C7.57 0 0 22.3858 0 50Z"
);

const K1 = 0.1;
const K2 = 0.25;

const Tabbar = () => {
  const open = useSharedValue(0);
  const k2 = useAnimatedProps(() => {
    return {
      d: interpolatePath(clamp(open.value, K1, K2), [K1, K2], [p1, p2]),
    };
  });
  const k1 = useAnimatedProps(() => {
    return {
      d: interpolatePath(clamp(open.value, 0, K1), [0, K1], [p11, p12]),
    };
  });
  const k3 = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        clamp(open.value, 0, 1),
        [0, K1, K2, 1],
        [p30, p12, p31, p32]
      ),
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        open.value = withTiming(open.value === 1 ? 0 : 1);
      }}
    >
      <View>
        <View
          style={{
            position: "absolute",
            top: -SIZE,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
          pointerEvents="none"
        >
          <Svg
            width={SIZE * 3}
            height={SIZE * 3}
            style={{
              top: -SIZE,
            }}
            viewBox="0 0 300 300"
          >
            <AnimatedPath animatedProps={k3} fill="#02CBD6" />
          </Svg>
        </View>
        <StaticTabbar />
        <View
          style={{
            position: "absolute",
            top: -SIZE,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
          pointerEvents="none"
        >
          <Svg
            width={SIZE * 3}
            height={SIZE * 3}
            style={{
              top: -SIZE,
            }}
            viewBox="0 0 300 300"
          >
            <AnimatedPath animatedProps={k1} fill="#02CBD6" />
            <AnimatedPath animatedProps={k2} fill="#02CBD6" />
          </Svg>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tabbar;
