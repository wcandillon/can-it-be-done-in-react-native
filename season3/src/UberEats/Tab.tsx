import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  text: {
    fontSize: 16,
    fontFamily: "UberMoveRegular"
  }
});

interface TabProps {
  name: string;
  anchor: number;
  y: Animated.Node<number>;
}

export default ({ name, anchor, y }: TabProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};
