import React from "react";
import { Value, set, useCode } from "react-native-reanimated";
import { timing } from "react-native-redash";
import { StyleSheet, View } from "react-native";

import CircularProgress from "./CircularProgress";
import { COLOR_BG, COLOR_FG, RADIUS, STROKE_WIDTH } from "./Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const progress = new Value(0);
  useCode(() => set(progress, timing({ duration: 10000 })), [progress]);
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <CircularProgress bg={COLOR_BG} fg={COLOR_FG} {...{ progress }} />
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            width: RADIUS * 2 - STROKE_WIDTH,
            height: RADIUS * 2 - STROKE_WIDTH,
            borderRadius: RADIUS - STROKE_WIDTH / 2,
            backgroundColor: COLOR_BG
          }}
        />
      </View>
    </View>
  );
};
