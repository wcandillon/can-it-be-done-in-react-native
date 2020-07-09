/* eslint-disable max-len */
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import { MIN_HEADER_HEIGHT } from "./Header";

const { height } = Dimensions.get("window");
const items = [
  {
    title: "Long Hongdae Nights",
    description:
      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
    price: "26 CHF",
  },
  {
    title: "Late Sunset",
    description:
      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
    price: "13.50 CHF",
  },
  {
    title: "Cabbage Kimchi",
    description: "Portion, vegan",
    price: "5.00 CHF",
  },
  {
    title: "Namur by Pieces",
    description:
      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
    price: "10.50 CHF",
  },
  {
    title: "Silim Lights",
    description:
      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
    price: "26.50 CHF",
  },
];

const menu = [
  { name: "Starters", items },
  { name: "Order Again", items },
  { name: "Picked for you", items },
  { name: "Gimbap Sushi", items },
];
export const defaultTabs = menu.map(({ name }) => ({ name, anchor: 0 }));
const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    fontFamily: "UberMoveRegular",
    fontSize: 14,
  },
  title1: {
    fontFamily: "UberMoveMedium",
    fontSize: 24,
  },
  title2: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: "#247A00",
  },
  item: {
    borderBottomColor: "#e2e3e4",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    fontFamily: "UberMoveMedium",
    marginBottom: 16,
  },
});

export interface TabModel {
  name: string;
  anchor: number;
}

interface ContentProps {
  y: Animated.Node<number>;
  onMeasurement: (index: number, tab: TabModel) => void;
}

export default ({ y, onMeasurement }: ContentProps) => {
  const opacity = interpolate(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, { opacity }]}>
        <Text style={styles.text}>$$ • Asiatisch • Koreanisch • Japanisch</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Opens at 11:30 AM</Text>
          <View style={styles.ratings}>
            <Icon name="star" color="#f4c945" size={24} style={styles.icon} />
            <Text style={styles.text}>(186)</Text>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.title2}>Restaurant info</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Europaallee 48, Zürich, Zürich 8004</Text>
          <Text style={styles.link}>More info</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {menu.map(({ name, items: menuItems }, index) => (
        <View
          style={styles.section}
          key={index}
          onLayout={({
            nativeEvent: {
              layout: { y: anchor },
            },
          }) => onMeasurement(index, { name, anchor: anchor - 142 })}
        >
          <Text style={styles.title1}>{name}</Text>
          {menuItems.map(({ title, description, price }, j) => (
            <View style={styles.item} key={j}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
              <Text style={styles.price}>{price}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={{ height }} />
    </>
  );
};
