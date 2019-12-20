import * as React from "react";
import { StyleSheet, View } from "react-native";

import Tab from "./Tab";
import { TabModel } from "./Content";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row"
  }
});

interface TabsProps {
  tabs: TabModel[];
  active?: boolean;
  onMeasurement?: (index: number, measurement: number) => void;
  onPress?: (index: number) => void;
}

export default ({ tabs, active, onMeasurement, onPress }: TabsProps) => (
  <View style={styles.overlay}>
    {tabs.map((tab, index) => (
      <Tab
        key={index}
        onMeasurement={
          onMeasurement ? onMeasurement.bind(null, index) : undefined
        }
        color={active ? "white" : "black"}
        onPress={onPress ? onPress.bind(null, index) : undefined}
        {...tab}
      />
    ))}
  </View>
);
