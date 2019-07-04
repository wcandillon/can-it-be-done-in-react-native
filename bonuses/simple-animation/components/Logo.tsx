// @flow
import * as React from "react";
import { StyleSheet, View } from "react-native";

const size = 200;
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    flexDirection: "row",
    flexWrap: "wrap",
    transform: [{ rotate: "45deg" }]
  },
  square: {
    width: size / 2,
    height: size / 2,
    borderRadius: size * 0.1,
    borderWidth: 5,
    borderColor: "white"
  },
  a: {
    backgroundColor: "#e1d0b3"
  },
  b: {
    backgroundColor: "#e7c651"
  },
  c: {
    backgroundColor: "#cfe1d1"
  },
  d: {
    backgroundColor: "#bfd4e4"
  }
});

export default () => (
  <View style={styles.container}>
    <View style={[styles.square, styles.a]} />
    <View style={[styles.square, styles.b]} />
    <View style={[styles.square, styles.c]} />
    <View style={[styles.square, styles.d]} />
  </View>
);
