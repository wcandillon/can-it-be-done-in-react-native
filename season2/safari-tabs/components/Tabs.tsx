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
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <Tab key={tab.id} {...{ tab, progress, index }} />
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
