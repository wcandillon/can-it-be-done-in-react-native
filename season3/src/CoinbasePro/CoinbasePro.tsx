import React from "react";
import { StyleSheet, View } from "react-native";

import data from "./data.json";
import Chart from "./Chart";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center"
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <Chart candles={data.slice(0, 30)} />
    </View>
  );
};
