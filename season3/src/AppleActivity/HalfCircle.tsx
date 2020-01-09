import React, { ReactNode } from "react";
import { View } from "react-native";

interface HalfCircleProps {
  flipped?: boolean;
  children: ReactNode;
  radius: number;
}

export default ({ flipped, children, radius }: HalfCircleProps) => {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius,
        overflow: "hidden"
      }}
    >
      <View
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          overflow: "hidden",
          transform: [
            { rotateX: flipped ? "180deg" : "0deg" },
            { rotateY: !flipped ? "180deg" : "0deg" }
          ]
        }}
      >
        {children}
      </View>
    </View>
  );
};
