import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
const cardWidth = width;
const cardHeight = cardWidth * ratio;
const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
  },
});

export default () => {
  return <Image style={styles.card} source={require("../assets/card.png")} />;
};
