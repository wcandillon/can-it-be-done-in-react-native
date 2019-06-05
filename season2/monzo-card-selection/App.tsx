/* eslint-disable global-require */
import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "./components/Card";

const cards = [
  {
    id: "summer-sunset",
    name: "Summer Sunset",
    design: require("./assets/cards/summer-sunset.png")
  },
  {
    id: "meteor-shower",
    name: "Meteor shower",
    design: require("./assets/cards/meteor-shower.png")
  },
  {
    id: "purple-sky",
    name: "Purple Sky",
    design: require("./assets/cards/purple-sky.png")
  }
];

export default function App() {
  return (
    <View style={styles.container}>
      {cards.map(card => (
        <Card key={card.id} {...{ card }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
