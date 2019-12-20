import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";

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

export default ({ transition }: TabHeaderProps) => {
  const opacity = transition;
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Tabs />
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={(
          <Animated.View
            style={{ backgroundColor: "black", width: 123 + 16, flex: 1 }}
          />
        )}
      >
        <Tabs active />
      </MaskedView>
    </Animated.View>
  );
};
