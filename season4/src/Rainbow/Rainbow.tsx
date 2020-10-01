import React from "react";
import { StyleSheet, View } from "react-native";

import Graph from "./Graph";
import Footer from "./components/Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});

const Rainbow = () => {
  return (
    <View style={styles.container}>
      <Graph />
      <Footer />
    </View>
  );
};

export default Rainbow;
