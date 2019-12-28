import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

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
}

const Item = ({ icon, label }: ItemProps) => (
  <View style={styles.item}>
    <Icon name={icon} style={styles.icon} size={24} />
    <Text style={styles.label}>{label}</Text>
  </View>
);

interface ListProps {
  items: ItemProps[];
}

export default ({ items }: ListProps) => {
  return (
    <View style={styles.container}>
      {items.map((item, key) => (
        <Item {...{ key }} {...item} />
      ))}
    </View>
  );
};
