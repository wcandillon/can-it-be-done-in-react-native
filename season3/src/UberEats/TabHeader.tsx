import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";

import Tab, { TabModel } from "./Tab";

const tabs: TabModel[] = [
  {
    name: "Recommandations",
    anchor: 100
  },
  {
    name: "Starters",
    anchor: 200
  },
  {
    name: "Gimbap Sushi",
    anchor: 300
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

const Tabs = ({ active }: { active?: boolean }) => (
  <View style={styles.overlay}>
    {tabs.map((tab, key) => (
      <Tab
        backgroundColor={active ? "black" : "white"}
        color={active ? "white" : "black"}
        {...{ key }}
        {...tab}
      />
    ))}
  </View>
);

interface TabHeaderProps {
  transition: Animated.Node<number>;
  y: Animated.Node<number>;
}

export default ({ transition, y }: TabHeaderProps) => {
  const opacity = transition;
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Tabs />
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <View style={{ backgroundColor: "black", width: 200, height: 45 }} />
        }
      >
        <Tabs active />
      </MaskedView>
    </Animated.View>
  );
};
