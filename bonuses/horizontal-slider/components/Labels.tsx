import * as React from "react";
import { View, StyleSheet } from "react-native";
import { mixColor } from "react-native-redash";
import Animated from "react-native-reanimated";

const {
  Value, cond, lessOrEq, add, round, divide,
} = Animated;

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
          const color = mixColor(
            cond(lessOrEq(index, i), 0, 1),
            "gray", "white",
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
