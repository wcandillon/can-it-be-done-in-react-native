import React from "react";
import { Platform, StyleSheet } from "react-native";
import Animated, {
  block,
  concat,
  cond,
  debug,
  eq,
  floor,
  interpolate,
  lessThan,
  multiply,
  sub
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "#FEFFFF",
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

interface LabelProps {
  domain: [number, number];
  size: number;
  y: Animated.Node<number>;
  opacity: Animated.Node<number>;
}

export default ({ domain: [min, max], size, y, opacity }: LabelProps) => {
  const value = interpolate(y, {
    inputRange: [0, size],
    outputRange: [min, max]
  });
  const int = floor(value);
  const dec = floor(multiply(sub(value, int), 100));
  const formatted = cond(
    eq(dec, 0),
    "00",
    cond(lessThan(dec, 10), concat("0", dec), dec)
  );

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: y }], opacity }]}
    >
      <ReText
        text={concat(int, ".", formatted, " $")}
        style={{ color: "black", fontVariant: ["tabular-nums"] }}
      />
    </Animated.View>
  );
};
