import React from "react";
import { Value, set, useCode } from "react-native-reanimated";
import { withTransition } from "react-native-redash";
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
  useCode(() => set(progress, 2.5), [progress]);
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <CircularProgress
          progress={withTransition(progress, { duration: 10000 })}
          bg={COLOR_BG}
          fg={COLOR_FG}
        />
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            backgroundColor: COLOR_BG,
            borderRadius: RADIUS,
            width: RADIUS * 2 - STROKE_WIDTH,
            height: RADIUS * 2 - STROKE_WIDTH
          }}
        />
      </View>
    </View>
  );
};
