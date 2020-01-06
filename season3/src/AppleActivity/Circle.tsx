import React from "react";
import { View } from "react-native";

interface CircleProps {
  backgroundColor: string;
  radius: number;
}
export default ({ radius, backgroundColor }: CircleProps) => (
  <View
    style={{
      backgroundColor,
      width: 2 * radius,
      height: 2 * radius,
      borderRadius: radius
    }}
  />
);
