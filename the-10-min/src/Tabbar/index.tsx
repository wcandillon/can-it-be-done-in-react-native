import React from "react";
import { StyleSheet, View } from "react-native";

import Tabbar from "./Tabbar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7DE3B6",
    justifyContent: "flex-end",
  },
});

export default () => (
  <View style={styles.container}>
    <Tabbar />
  </View>
);
