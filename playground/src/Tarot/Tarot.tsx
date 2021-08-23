import React from "react";
import { View, StyleSheet } from "react-native";

import Card from "./Card";

const cards = [
  {
    source: require("./assets/RWS_Tarot_08_Strength.jpeg"),
    width: 300,
    height: 541,
  },
  {
    source: require("./assets/RWS_Tarot_16_Tower.jpeg"),
    width: 300,
    height: 514,
  },
  {
    source: require("./assets/RWS_Tarot_07_Chariot.jpeg"),
    width: 300,
    height: 529,
  },
  {
    source: require("./assets/RWS_Tarot_06_Lovers.jpeg"),
    width: 300,
    height: 518,
  },
  {
    source: require("./assets/RWS_Tarot_02_High_Priestess.jpeg"),
    width: 750,
    height: 1302,
  },
  {
    source: require("./assets/RWS_Tarot_01_Magician.jpeg"),
    width: 596,
    height: 1048,
  },
];
export const assets = cards.map((card) => card.source);

const Tarot = () => {
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});

export default Tarot;
