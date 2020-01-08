import React, { ReactNode } from "react";
import { View } from "react-native";
import { COLOR_BG, RADIUS } from "./Constants";

interface HalfCircleProps {
  flipped?: boolean;
  children: ReactNode;
}

export default ({ flipped, children }: HalfCircleProps) => {
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
          overflow: "hidden",
          transform: [
            { rotate: flipped ? "180deg" : "0deg" },
            { rotateY: flipped ? "180deg" : "0deg" }
          ]
        }}
      >
        {children}
      </View>
    </View>
  );
};
