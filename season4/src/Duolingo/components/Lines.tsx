import React from "react";
import { StyleSheet, View } from "react-native";

import { Offset } from "../Layout";

interface LinesProps {
  offsets: Offset[];
}

const Lines = ({ offsets }: LinesProps) => {
  const lines = offsets.reduce(
    (result, offset) => {
      const height = offset.height.value;
      if (result.indexOf(height) === -1) {
        result.push(height);
      }
      return result;
    },
    [0]
  );
  return (
    <View style={StyleSheet.absoluteFill}>
      {[
        ...lines,
        lines[lines.length - 1] +
          lines[lines.length - 1] -
          lines[lines.length - 2],
      ].map((line) => (
        <View
          key={line}
          style={{
            top: line - 2,
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
