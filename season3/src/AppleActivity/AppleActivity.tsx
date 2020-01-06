import React from "react";
import { StyleSheet, View } from "react-native";

import { R1, R2, R3 } from "./Constants";
import Ring from "./Ring";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000001"
  }
});

export default () => {
  return (
    <View style={styles.container}>
      {[R3, R2, R1].map((ring, i) => (
        <Ring key={i} {...ring} />
      ))}
    </View>
  );
};
