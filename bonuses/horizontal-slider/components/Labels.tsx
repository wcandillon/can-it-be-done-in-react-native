import * as React from "react";
import { View, StyleSheet } from "react-native";
import { DangerZone } from "expo";
import { interpolateColors } from "react-native-redash";

const { Animated } = DangerZone;
const {
  Value, cond, eq, lessOrEq, add, round, divide,
} = Animated;

const white = { r: 255, g: 255, b: 255 };
const gray = { r: 128, g: 128, b: 128 };

interface LabelProps {
  x: typeof Value;
  count: number;
  size: number;
}

export default ({ count, x, size }: LabelProps) => {
  const index = add(round(divide(x, size)), 1);
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {
        (new Array(count)).fill(0).map((e, i) => {
          const color = interpolateColors(
            cond(lessOrEq(index, i), 0, 1),
            [0, 1],
            [gray, white],
          );
          return (
            <View key={i} style={{ flex: 1 }}>
              <Animated.Text style={{ color, textAlign: "center", fontSize: 24 }}>{`${i + 1}`}</Animated.Text>
            </View>
          );
        })
      }
    </View>
  );
};
