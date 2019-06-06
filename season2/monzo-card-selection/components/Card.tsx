import * as React from "react";
import { Image, StyleSheet } from "react-native";

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

export default ({ card }: CardProps) => {
  return <Image source={card.design} style={styles.design} />;
};

const styles = StyleSheet.create({
  design: {
    ...StyleSheet.absoluteFillObject,
    left: 32,
    right: 32,
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  }
});
