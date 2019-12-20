import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";

import { bInterpolate, useTransition } from "react-native-redash";
import Tab from "./Tab";

const tabs = [
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
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: "row"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row"
  }
});

interface TabsProps {
  active?: boolean;
  onMeasurement: (index: number, measurement: number) => void;
  onPress?: (index: number) => void;
}

const Tabs = ({ active, onMeasurement, onPress }: TabsProps) => (
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

interface TabHeaderProps {
  transition: Animated.Node<number>;
  y: Animated.Node<number>;
}

export default ({ transition }: TabHeaderProps) => {
  const [index, setIndex] = useState(0);
  const [measurements, setMeasurements] = useState<number[]>(
    new Array(tabs.length).fill(0)
  );
  const opacity = transition;
  const t1 = useTransition(index === 1);
  const width = bInterpolate(t1, measurements[0], measurements[1]);
  const translateX = bInterpolate(t1, 0, measurements[0] + 8);
  /*
  const translateX =
    measurements.filter((_, i) => i < index).reduce((acc, m) => acc + m, 0) +
    8 * index;
    */
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Tabs
        onMeasurement={(i, m) => {
          measurements[i] = m;
          setMeasurements([...measurements]);
        }}
      />
      <View>
        <Animated.View
          style={{
            borderRadius: 24,
            backgroundColor: "black",
            width,
            flex: 1,
            transform: [{ translateX }]
          }}
        />
      </View>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={(
          <Animated.View
            style={{
              backgroundColor: "black",
              width,
              flex: 1,
              transform: [{ translateX }]
            }}
          />
        )}
      >
        <Tabs active onPress={i => setIndex(i)} />
      </MaskedView>
    </Animated.View>
  );
};
