import * as React from "react";
import { StyleSheet } from "react-native";

import Animated from "react-native-reanimated";
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
  translateX: Animated.Node<number>;
}

export default ({
  tabs,
  active,
  onMeasurement,
  onPress,
  translateX
}: TabsProps) => (
  <Animated.View style={[styles.overlay, { transform: [{ translateX }] }]}>
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
  </Animated.View>
);
