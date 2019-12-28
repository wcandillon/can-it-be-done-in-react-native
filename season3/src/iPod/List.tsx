import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, { color, cond } from "react-native-reanimated";
import { between } from "react-native-redash";

const ITEM_HEIGHT = 45;
const blue = color(41, 128, 185);
const white = color(255, 255, 255);
const black = color(0, 0, 0);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 45
  },
  icon: {
    paddingHorizontal: 16
  },
  label: {
    fontSize: 16,
    fontFamily: "Chicago"
  }
});

interface ItemProps {
  icon: string;
  label: string;
  active: Animated.Node<0 | 1>;
}

const Item = ({ icon, label, active }: ItemProps) => (
  <Animated.View
    style={[styles.item, { backgroundColor: cond(active, blue, white) }]}
  >
    <Icon name={icon} style={styles.icon} size={24} />
    <Animated.Text
      style={[styles.label, { color: cond(active, white, black) }]}
    >
      {label}
    </Animated.Text>
  </Animated.View>
);

interface ListProps {
  items: ItemProps[];
  y: Animated.Node<number>;
}

export default ({ items, y }: ListProps) => {
  return (
    <View style={styles.container}>
      {items.map((item, key) => (
        <Item
          active={between(y, key * ITEM_HEIGHT, (key + 1) * ITEM_HEIGHT)}
          {...{ key }}
          {...item}
        />
      ))}
    </View>
  );
};
