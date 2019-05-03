import React from "react";
import {
  StyleSheet, View,
} from "react-native";

import Slider from "./components/Slider";

export default () => (
  <View style={styles.container}>
    <Slider />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
