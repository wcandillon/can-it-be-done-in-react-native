import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import {
  approximates,
  runSpring,
  bInterpolateColor
} from "react-native-redash";

const {
  Value,
  useCode,
  cond,
  Clock,
  and,
  set,
  not,
  clockRunning,
  block,
  stopClock,
  interpolate,
  Extrapolate
} = Animated;
const margin = 10;
const activeColor = { r: 41, g: 128, b: 185 };
const nonActiveColor = { r: 145, g: 146, b: 147 };
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold"
  }
});

interface ChannelIconProps {
  name: string;
  radius: number;
  currentIndex: number;
  index: Animated.Value<number>;
  isActive: Animated.Value<number>;
}

export default ({
  name,
  radius,
  isActive,
  index,
  currentIndex
}: ChannelIconProps) => {
  const clock = new Clock();
  const value = new Value(0);
  useCode(
    block([
      cond(and(not(isActive), approximates(index, currentIndex)), [
        set(value, runSpring(clock, 0, 1)),
        cond(not(clockRunning(clock)), set(isActive, 0))
      ]),
      cond(isActive, [stopClock(clock), set(value, 0)])
    ]),
    []
  );
  const backgroundColor = bInterpolateColor(
    value,
    nonActiveColor,
    activeColor,
    "rgb"
  );
  const scale = interpolate(index, {
    inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
    outputRange: [1, 1.15, 1],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Animated.View
        style={{
          width: (radius - margin) * 2,
          height: (radius - margin) * 2,
          borderRadius: radius - margin,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale }]
        }}
      >
        <Text style={styles.text}>{name}</Text>
      </Animated.View>
    </View>
  );
};
