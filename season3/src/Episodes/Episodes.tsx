import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "./Icon";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: StyleGuide.spacing * 2,
    backgroundColor: StyleGuide.palette.background,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});

export const episodes = [
  {
    id: "Chrome",
    name: "Google Chrome",
    icon: require("../../assets/icons/chrome.png")
  },
  {
    id: "LiquidSwipe",
    name: "Liquid Swipe",
    icon: require("../../assets/icons/liquid-swipe.png")
  },
  {
    id: "Things",
    name: "Things",
    icon: require("../../assets/icons/things.png")
  },
  {
    id: "UberEats",
    name: "UberEats",
    icon: require("../../assets/icons/uber-eats.png")
  },
  {
    id: "iPod",
    name: "iPod Classic",
    icon: require("../../assets/icons/ipod.png")
  },
  {
    id: "AppleActivity",
    name: "Activity Rings",
    icon: require("../../assets/icons/apple-activity.png")
  },
  {
    id: "CoinbasePro",
    name: "Coinbase Pro",
    icon: require("../../assets/icons/coinbase-pro.png")
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
