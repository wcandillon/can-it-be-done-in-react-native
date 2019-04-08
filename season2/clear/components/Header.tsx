import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Constants } from "expo";

export const HEADER_HEIGHT = Constants.statusBarHeight + 64;

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Personal List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
