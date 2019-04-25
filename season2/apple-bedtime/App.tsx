import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Slider from "./components/Slider";

export default () => (
  <View style={styles.container}>
    <Slider />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
