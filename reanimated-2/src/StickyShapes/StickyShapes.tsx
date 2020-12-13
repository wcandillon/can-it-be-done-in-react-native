import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Square from "./Square";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: (width - 150) / 2,
    top: 0,
    bottom: 0,
    width: 150,
  },
});

const StickyShapes = () => {
  return (
    <View style={styles.container}>
      <Square />
    </View>
  );
};

export default StickyShapes;
