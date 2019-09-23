import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "./Icon";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StyleGuide.spacing * 2,
    backgroundColor: StyleGuide.palette.background
  }
});

export const episodes = [
  {
    id: "Things",
    name: "Things",
    icon: require("../../assets/icons/things.png")
  }
];

export default () => {
  return (
    <View style={styles.container}>
      {episodes.map(episode => (
        <Icon key={episode.id} {...episode} />
      ))}
    </View>
  );
};
