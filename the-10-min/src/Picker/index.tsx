import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Picker from "./Picker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    marginBottom: 31,
  },
});
const start = 1900;
const values = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start + i;
    return { value, label: `${value}` };
  })
  .reverse();

const PickerDemo = () => {
  const defaultValue = 1990 - start;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What year were you born?</Text>
      <Picker {...{ values, defaultValue }} />
    </View>
  );
};

export default PickerDemo;
