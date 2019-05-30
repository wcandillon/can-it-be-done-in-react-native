import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MIN_HEADER_HEIGHT } from "./Model";

interface HeaderProps {
  artist: string;
}

export default ({ artist }: HeaderProps) => {
  const foo = 1;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{artist}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },
});
