import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaskedView from "@react-native-community/masked-view";

import Picker from "./Picker";
import { ITEM_HEIGHT } from "./Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
const start = 1900;
const values = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start + i;
    return { value, label: `${value}` };
  });

const PickerDemo = () => {
  const defaultValue = 1990 - start;
  return (
    <View style={styles.container}>
      <View>
        <Text>What year were you born?</Text>
        <Picker {...{ values, defaultValue }} />
      </View>
    </View>
  );
};

export default PickerDemo;
