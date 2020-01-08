import React from "react";
import { Value, set, useCode } from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { StyleSheet, View } from "react-native";

import CircularProgress from "./CircularProgress";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000001"
  }
});

export default () => {
  const progress = new Value(0);
  useCode(() => set(progress, 2.5), [progress]);
  return (
    <View style={styles.container}>
      <CircularProgress
        progress={withTransition(progress, { duration: 10000 })}
      />
    </View>
  );
};
