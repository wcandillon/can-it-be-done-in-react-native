import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Value, cond, set, useCode } from "react-native-reanimated";

import { bin, timing } from "react-native-redash";
import { RotationGestureHandler } from "react-native-gesture-handler";
import { R1, R2, R3, SIZE, STROKE_WIDTH } from "./Constants";
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
  const [ready, setReady] = useState(0);
  const progress = new Value(0);
  useCode(
    () =>
      cond(
        bin(ready === rings.length),
        set(progress, timing({ duration: 2000 }))
      ),
    [progress, ready]
  );
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {rings.map((ring, i) => (
          <Ring
            onReady={() => setReady(prev => prev + 1)}
            key={i}
            {...{ ring, progress }}
          />
        ))}
      </View>
      <Icons />
    </View>
  );
};
