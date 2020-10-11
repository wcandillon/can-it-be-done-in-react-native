import React from "react";
import { StyleSheet, View } from "react-native";

import { NUMBER_OF_LINES } from "./Placeholder";

interface LinesProps {
  height: number;
}

const Lines = ({ height }: LinesProps) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {new Array(NUMBER_OF_LINES).fill(0).map((_, index) => (
        <View
          key={index * height}
          style={{
            top: index * height - 2,
            width: "100%",
            height: 2,
            backgroundColor: "#E6E5E6",
          }}
        />
      ))}
    </View>
  );
};

export default Lines;
