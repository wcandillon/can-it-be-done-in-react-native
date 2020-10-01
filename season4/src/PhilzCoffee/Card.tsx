import React from "react";
import { Dimensions, View } from "react-native";

import { Product } from "./Model";

const { width } = Dimensions.get("window");

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  return (
    <View
      style={{
        width,
        height: (width * 1564) / 974,
        backgroundColor: product.color1,
      }}
    >
      <View
        style={{
          borderRadius: 16,
          margin: 32,
          flex: 1,
          backgroundColor: product.color2,
        }}
      />
    </View>
  );
};

export default Card;
