import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { runTiming } from "react-native-redash";

import Tab, { ITab } from "./Tab";

const { Value, Clock, block, useCode, set } = Animated;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs }: TabsProps) => {
  const y = new Value(0);
  const progress = new Value(0);
  const clock = new Clock();
  useCode(
    block([
      set(
        progress,
        runTiming(clock, 0, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear
        })
      )
    ]),
    [tabs]
  );
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <Tab key={tab.id} {...{ tab, progress }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});
