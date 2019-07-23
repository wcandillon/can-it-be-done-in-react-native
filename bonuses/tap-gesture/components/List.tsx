import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { NavigationScreenConfigProps } from "react-navigation";
import Thumbnail from "./Thumbnail";

export const examples = [
  {
    screen: "BlankScreen",
    title: "Breakfast",
    source: require("../assets/breakfast.png")
  },
  {
    screen: "BlankScreen",
    title: "Vegeratian",
    source: require("../assets/vegetarian.png")
  }
];

const styles = StyleSheet.create({
  container: {},
  content: {
    paddingBottom: 32
  }
});

export default ({ navigation }: NavigationScreenConfigProps) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map((thumbnail, index) => (
        <Thumbnail
          key={index}
          onPress={() => navigation.navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};
