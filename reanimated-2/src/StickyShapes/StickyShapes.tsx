import React from "react";
import { View, StyleSheet } from "react-native";

import Square from "./Square";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
