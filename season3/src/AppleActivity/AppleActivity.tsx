import React from "react";
import { StyleSheet, View } from "react-native";
import { Value, multiply, set, useCode } from "react-native-reanimated";

import { timing } from "react-native-redash";
import { R1, R2, R3, STROKE_WIDTH } from "./Constants";
import Ring from "./Ring";
import Stickers from "./Stickers";

const backgroundColor = "#000001";
const fgRadius = R1.size / 2 - STROKE_WIDTH;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  fg: {
    backgroundColor,
    borderRadius: fgRadius,
    width: fgRadius * 2,
    height: fgRadius * 2
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Ring ring={R1} />
      </View>
    </View>
  );
};
