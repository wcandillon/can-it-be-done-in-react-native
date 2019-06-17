import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Tab, { ITab } from "./Tab";

const { Value } = Animated;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs }: TabsProps) => {
  const y = new Value(0);
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <Tab key={tab.id} {...{ tab }} />
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
