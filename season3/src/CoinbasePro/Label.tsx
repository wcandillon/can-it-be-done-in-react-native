import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  concat,
  cond,
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

const format = (value: Animated.Node<number>) => {
  const int = floor(value);
  const dec = floor(multiply(sub(value, int), 100));
  const formattedDec = cond(
    eq(dec, 0),
    "00",
    cond(lessThan(dec, 10), concat("0", dec), concat(dec))
  );
  return concat(int, ".", formattedDec, " $");
};

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
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: y }], opacity }]}
    >
      <ReText
        text={format(value)}
        style={{ color: "black", fontVariant: ["tabular-nums"] }}
      />
    </Animated.View>
  );
};
