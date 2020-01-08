import React from "react";
import { View } from "react-native";
import { COLOR_BG, RADIUS } from "./Constants";

interface HalfCircleProps {
  flipped?: boolean;
}

export default ({ flipped }: HalfCircleProps) => {
  return (
    <View
      style={{
        width: RADIUS * 2,
        height: RADIUS,
        overflow: "hidden",
        transform: [{ rotate: flipped ? "180deg" : "0deg" }]
      }}
    >
      <View
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: RADIUS,
          backgroundColor: COLOR_BG
        }}
      />
    </View>
  );
};
