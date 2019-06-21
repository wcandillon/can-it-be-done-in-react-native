import * as React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { runTiming } from "react-native-redash";

import Tab, { ITab, OVERVIEW } from "./Tab";

const { Value, Clock, block, useCode, set } = Animated;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs }: TabsProps) => {
  const transition = new Value(0);
  const selectedTab = new Value(OVERVIEW);
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        {tabs.map((tab, index) => (
          <Tab key={tab.id} {...{ tab, transition, selectedTab, index }} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});
