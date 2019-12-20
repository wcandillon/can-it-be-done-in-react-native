import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

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
    height: 45
  }
});

interface TabHeaderProps {
  transition: Animated.Node<number>;
  y: Animated.Node<number>;
}

export default ({ transition, y }: TabHeaderProps) => {
  const opacity = transition;
  return (
    <Animated.ScrollView
      style={[styles.container, { opacity }]}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {tabs.map((tab, key) => (
        <Tab {...{ y, key }} {...tab} />
      ))}
    </Animated.ScrollView>
  );
};
