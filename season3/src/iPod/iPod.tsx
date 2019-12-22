import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Value } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Screen from "./Screen";
import ClickWheel from "./ClickWheel";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  clickWheel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const alpha = new Value(0);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Screen {...{ alpha }} />
      <View style={styles.clickWheel}>
        <ClickWheel {...{ alpha }} />
      </View>
    </SafeAreaView>
  );
};
