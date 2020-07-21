import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useValue } from "react-native-redash";

import Picker from "./Picker";

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
  const value = useValue(1990 - start);
  return (
    <View style={styles.container}>
      <View>
        <Text>What year were you born?</Text>
        <View>
          <Picker {...{ value, values }} />
        </View>
      </View>
    </View>
  );
};

export default PickerDemo;
