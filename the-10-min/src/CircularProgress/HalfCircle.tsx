import React from "react";
import { View } from "react-native";
import { RADIUS } from "./Constants";

interface HalfCircleProps {
  color: string;
}

export default ({ color }: HalfCircleProps) => {
  return (
    <View
      style={{
        width: RADIUS * 2,
        height: RADIUS,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: color,
          width: RADIUS * 2,
          height: RADIUS * 2,
          borderRadius: RADIUS,
        }}
      />
    </View>
  );
};
