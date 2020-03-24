import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "./components/Card";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <Card />
    </View>
  );
};
