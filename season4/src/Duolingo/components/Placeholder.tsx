import React from "react";
import { View } from "react-native";

import { MARGIN_LEFT, MARGIN_TOP, Offset, WORD_HEIGHT } from "../Layout";

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
        height: WORD_HEIGHT - 4,
        borderRadius: 8,
      }}
    />
  );
};

export default Placeholder;
