import React from "react";
import { StyleSheet, Text, View } from "react-native";

const currency = new Intl.NumberFormat("ch", {
  style: "currency",
  currency: "CHF",
});

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e2e3e4",
    paddingLeft: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    backgroundColor: "#e2e3e4",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
  price: {
    fontFamily: "UberMoveRegular",
    fontSize: 16,
    marginRight: 8,
  },
});

export interface ItemModel {
  key: string;
  title: string;
  price: number;
  quantity: number;
}

interface ItemLayoutProps {
  item: ItemModel;
}

const ItemLayout = ({ item: { price, quantity, title } }: ItemLayoutProps) => {
  return (
    <View style={styles.content}>
      <View style={styles.info}>
        <View style={styles.quantity}>
          <Text>{quantity}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.price}>{currency.format(price)}</Text>
    </View>
  );
};

export default ItemLayout;
