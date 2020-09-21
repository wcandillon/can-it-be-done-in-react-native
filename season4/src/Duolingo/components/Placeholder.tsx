import React from "react";
import { View } from "react-native";

import { Offset } from "../Layout";

interface PlaceholderProps {
  offset: Offset;
}

const Placeholder = ({ offset }: PlaceholderProps) => {
  return (
    <View
      style={{
        backgroundColor: "#E6E5E6",
        position: "absolute",
        top: offset.originalY.value + 200 + 2,
        left: offset.originalX.value - 32 + 2,
        width: offset.width.value - 4,
        height: offset.height.value - 4,
        borderRadius: 8,
      }}
    />
  );
};

export default Placeholder;
