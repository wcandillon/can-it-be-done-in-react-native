import React from "react";
import { View } from "react-native";

interface HalfCircleProps {
  flipped?: boolean;
  color: string;
  radius: number;
}

export default ({ flipped, color, radius }: HalfCircleProps) => {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius,
        overflow: "hidden",
        transform: [{ rotate: flipped ? "180deg" : "0deg" }]
      }}
    >
      <View
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: color
        }}
      />
    </View>
  );
};
