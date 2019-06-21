import * as React from "react";
import { StyleSheet, StatusBar } from "react-native";
import Animated from "react-native-reanimated";

import Tab, { ITab, OVERVIEW } from "./Tab";

const { Value } = Animated;

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
      <Animated.View style={styles.container}>
        {tabs.map((tab, index) => (
          <Tab key={tab.id} {...{ tab, transition, selectedTab, index }} />
        ))}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});
