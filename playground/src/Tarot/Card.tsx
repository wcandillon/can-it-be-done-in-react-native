import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 430.94 / 228.14;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;

interface CardProps {
  card: {
    width: number;
    height: number;
    source: ReturnType<typeof require>;
  };
}

const Card = ({ card: { source, width, height } }: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={source}
          style={{ width: IMAGE_WIDTH, height: (IMAGE_WIDTH * height) / width }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Card;
