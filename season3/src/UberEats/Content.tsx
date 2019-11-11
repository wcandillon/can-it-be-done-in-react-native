/* eslint-disable max-len */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";

const menu = [
  {
    title: "Long Hongdae Nights",
    description:
      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
    price: "26 CHF"
  },
  {
    title: "Late Sunset",
    description:
      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
    price: "13.50 CHF"
  },
  {
    title: "Cabbage Kimchi",
    description: "Portion, vegan",
    price: "5.00 CHF"
  },
  {
    title: "Namur by Pieces",
    description:
      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
    price: "10.50 CHF"
  },
  {
    title: "Silim Lights",
    description:
      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
    price: "26.50 CHF"
  }
];
const styles = StyleSheet.create({
  placeholder: {
    height: HEADER_IMAGE_HEIGHT
  },
  text: {
    fontFamily: "UberMoveRegular"
  },
  title1: {
    fontFamily: "UberMoveMedium"
  },
  title2: {
    fontFamily: "UberMoveMedium"
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4"
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  link: {
    color: "#247A00"
  },
  item: {},
  title: {},
  description: {},
  price: {}
});

export default () => {
  return (
    <>
      <View style={styles.placeholder} />
      <Text style={styles.text}>$$ • Asiatisch • Koreanisch • Japanisch</Text>
      <View style={styles.info}>
        <Text style={styles.text}>Opens at 11:30 AM</Text>
        <Icon name="star" color="#f4c945" />
        <Text style={styles.text}>(186)</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.title2}>Restaurant info</Text>
      <View style={styles.info}>
        <Text style={styles.text}>Europaallee 48, Zürich, Zürich 8004</Text>
        <Text style={styles.link}>More info</Text>
      </View>
      <View style={styles.divider} />
      {menu.map(({ title, description, price }) => (
        <View style={styles.item} key={title}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      ))}
    </>
  );
};
