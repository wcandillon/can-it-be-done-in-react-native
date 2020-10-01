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
});

interface CardProps {
  product: Product;
}

const Card = ({ product: { color2, title, subtitle } }: CardProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 16,
          margin: 32,
          flex: 1,
          backgroundColor: color2,
        }}
      >
        <CardHeader />
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
        <View />
        <Button label="I'll try it" />
      </View>
    </View>
  );
};

export default Card;
