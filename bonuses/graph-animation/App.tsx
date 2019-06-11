import React from "react";
import { StyleSheet, View } from "react-native";

import Graph from "./components/Graph";
import MorphingAnimation from "./components/MorphingAnimation";

const data = [
  { date: new Date(2018, 9, 1).getTime(), value: 0 },
  { date: new Date(2018, 9, 16).getTime(), value: 0 },
  { date: new Date(2018, 9, 17).getTime(), value: 200 },
  { date: new Date(2018, 10, 1).getTime(), value: 200 },
  { date: new Date(2018, 10, 2).getTime(), value: 300 },
  { date: new Date(2018, 10, 5).getTime(), value: 300 }
];

// <Graph {...{ data }} />
export default () => (
  <View style={styles.container}>
    <MorphingAnimation />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
