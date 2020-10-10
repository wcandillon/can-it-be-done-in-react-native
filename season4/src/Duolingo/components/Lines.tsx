import React from "react";
import { StyleSheet, View } from "react-native";

const Lines = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {[0, 49, 49 * 2].map((line) => (
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
