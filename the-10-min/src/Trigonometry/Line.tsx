import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const styles = StyleSheet.create({
  line: {
    width: 3,
    height: "100%",
    backgroundColor: "black",
  },
});

interface LineProps {
  progress: Animated.Node<number>;
}

const Line = ({ progress }: LineProps) => {
  return <View style={styles.line} />;
};

export default Line;
