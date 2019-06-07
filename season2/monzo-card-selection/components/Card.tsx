import * as React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

export interface Card {
  id: string;
  name: string;
  design: number;
  thumbnail: number;
  color: string;
}

interface CardProps {
  card: Card;
}

const { width } = Dimensions.get("window");
const margin = width / 8;
const CARD_ASPECT_RATIO = 1324 / 863;
export const CARD_WIDTH = width - margin * 2;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export default ({ card }: CardProps) => {
  return <Image source={card.design} style={styles.design} />;
};

const styles = StyleSheet.create({
  design: {
    ...StyleSheet.absoluteFillObject,
    left: margin,
    right: margin,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  }
});
