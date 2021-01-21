import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Background from "./Background";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const state = useSharedValue(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  return (
    <View style={styles.container}>
      <Background />
    </View>
  );
};

export default Board;
