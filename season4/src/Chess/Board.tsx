import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Background from "./Background";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  return (
    <View style={styles.container}>
      <Background />
    </View>
  );
};

export default Board;
