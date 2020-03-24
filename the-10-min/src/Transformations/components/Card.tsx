import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

export enum Cards {
  Card1,
  Card2,
  Card3,
}

interface CardProps {
  type: Cards;
}

export default ({ type }: CardProps) => {
  let source: number;
  switch (type) {
    case Cards.Card1:
      source = require("../assets/card1.png");
      break;
    case Cards.Card2:
      source = require("../assets/card2.png");
      break;
    case Cards.Card3:
      source = require("../assets/card3.png");
      break;
    default:
      throw Error("Invalid card style");
  }
  return <Image style={styles.card} {...{ source }} />;
};
