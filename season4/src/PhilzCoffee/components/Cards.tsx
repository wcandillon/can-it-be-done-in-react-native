/* eslint-disable max-len */
import React from "react";
import { View, Image, Text, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export const cards = [
  {
    picture: require("../assets/cards/a.jpg"),
    caption: "We’ve got an exciting announcement coming November 23rd...",
  },
  {
    picture: require("../assets/cards/b.jpg"),
    caption:
      "Let's look out for one another and keep each other safe. Remember, please wear a mask to pick up your order. If you'd like to learn more about our safety procedures check out our Community Updates page",
  },
  {
    picture: require("../assets/cards/c.jpg"),
    caption: "We’ve got an exciting announcement coming November 23rd...",
  },
  {
    picture: require("../assets/cards/d.jpg"),
    caption:
      "Your mission, should you accept, is to snag yourself a bottle of this tasty cold brew to enjoy at home. Don't forget to add a 32oz bottle of Mission Cold Brew to your next order.",
  },
];
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 32,
    height: width,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  caption: {
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: "white",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
  },
  text: {
    fontFamily: "GothamRounded-Medium",
    fontSize: 16,
    textAlign: "center",
    color: "#432406",
  },
});

interface CardProps {
  picture: ReturnType<typeof require>;
  caption: string;
}

const Card = ({ picture, caption }: CardProps) => {
  return (
    <>
      <View style={styles.container}>
        <Image source={picture} style={styles.image} />
      </View>
      <View style={styles.caption}>
        <Text style={styles.text}>{caption}</Text>
      </View>
    </>
  );
};

const Cards = () => {
  return (
    <View>
      {cards.map(({ picture, caption }, index) => (
        <Card key={index} picture={picture} caption={caption} />
      ))}
    </View>
  );
};

export default Cards;
