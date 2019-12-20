import * as React from "react";
import { StyleSheet, View } from "react-native";

import Tab from "./Tab";

export const tabs = [
  {
    name: "Recommandations",
    anchor: 100,
    width: 123 + 16
  },
  {
    name: "Starters",
    anchor: 200,
    width: 53 + 16
  },
  {
    name: "Gimbap Sushi",
    anchor: 300,
    width: 91 + 16
  },
  {
    name: "Bimbap Rice",
    anchor: 400
  },
  {
    name: "Noodles",
    anchor: 500
  },
  {
    name: "Fried Chicken",
    anchor: 600
  },
  {
    name: "Korean Favourites",
    anchor: 600
  }
];

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row"
  }
});

interface TabsProps {
  active?: boolean;
  onMeasurement?: (index: number, measurement: number) => void;
  onPress?: (index: number) => void;
}

export default ({ active, onMeasurement, onPress }: TabsProps) => (
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
