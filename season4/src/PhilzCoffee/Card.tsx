import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";

import { Product } from "./Model";
import Button from "./components/Button";
import CardHeader from "./components/CardHeader";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    height: (width * 1564) / 974,
  },
  title: {
    fontFamily: "GothamRounded-Bold",
    fontSize: 28,
    textAlign: "center",
    color: "#432406",
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "GothamRounded-Light",
    fontSize: 16,
    textAlign: "center",
    color: "#432406",
  },
});

interface CardProps {
  product: Product;
}

const Card = ({ product: { color1, title, subtitle } }: CardProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 16,
          margin: 32,
          flex: 1,
          backgroundColor: color1,
          padding: 16,
        }}
      >
        <CardHeader />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={{ flex: 1 }} />
        <Button label="I'll try it" />
      </View>
    </View>
  );
};

export default Card;
