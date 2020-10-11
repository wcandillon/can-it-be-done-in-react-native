import React from "react";
import { View } from "react-native";

import { Offset } from "../Layout";

export const MARGIN_TOP = 150;
export const MARGIN_LEFT = 32;

interface PlaceholderProps {
  offset: Offset;
}

const Placeholder = ({ offset }: PlaceholderProps) => {
  return (
    <View
      style={{
        backgroundColor: "#E6E5E6",
        position: "absolute",
        top: offset.originalY.value + MARGIN_TOP + 2,
        left: offset.originalX.value - MARGIN_LEFT + 2,
        width: offset.width.value - 4,
        height: offset.height.value - 4,
        borderRadius: 8,
      }}
    />
  );
};

export default Placeholder;
