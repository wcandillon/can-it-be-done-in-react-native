import React from "react";
import { StyleSheet, View } from "react-native";
import { Value, set, useCode } from "react-native-reanimated";

import { timing } from "react-native-redash";
import { R1, R2, R3 } from "./Constants";
import Ring from "./Ring";
import Icons from "./Icons";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000001"
  },
  container: {
    flex: 1,
    transform: [{ rotate: "270deg" }]
  }
});
const rings = [R3, R2, R1];

export default () => {
  const progress = new Value(0);
  useCode(() => set(progress, timing({ duration: 2000 })), [progress]);
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {rings.map((ring, i) => (
          <Ring key={i} {...{ ring, progress }} />
        ))}
      </View>
      <Icons />
    </View>
  );
};
