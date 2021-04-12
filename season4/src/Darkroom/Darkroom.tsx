import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Picture from "./Picture";
import Controls, { PADDING } from "./Controls";
import Cursor from "./Cursor";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-evenly",
  },
  cursors: {
    ...StyleSheet.absoluteFillObject,
    left: PADDING / 2,
    right: PADDING / 2,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(50, 100, 150, 0.5)",
  },
});

export const assets = [
  require("./assets/1.jpg"),
  require("./assets/2.jpg"),
  require("./assets/3.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/6.jpg"),
];

const Darkroom = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Picture source={assets[3]} />
      <View>
        <Controls />
        <View style={styles.cursors}>
          <Cursor />
          <Cursor />
          <Cursor />
          <Cursor />
          <Cursor />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Darkroom;
