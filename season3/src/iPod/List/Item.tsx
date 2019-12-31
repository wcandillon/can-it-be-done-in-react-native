import React from "react";
import { StyleSheet, Text, View, processColor } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { Command } from "../ClickWheel";
import Image from "../Image";
import Active from "./Active";
import { PlayerParams } from "../data";
import { Navigation } from "../IPodNavigator";

const blue = processColor("#2980b9");
const white = processColor("white");
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 45
  },
  icon: {
    paddingHorizontal: 16
  },
  labelContainer: {
    flex: 1,
    justifyContent: "center"
  },
  label: {
    fontSize: 16,
    fontFamily: "Chicago",
    flexWrap: "wrap"
  },
  thumbnail: {
    width: 45,
    height: 45,
    marginHorizontal: 16
  }
});

export interface Item {
  screen: string;
  label: string;
  icon?: string;
  thumbnail?: string;
  params?: PlayerParams;
}

interface ItemProps extends Item {
  onPress: (navigation: Navigation) => void;
}

export default ({
  icon,
  thumbnail,
  label,
  command,
  active,
  onPress
}: ItemProps) => {
  return (
    <View style={[styles.item]}>
      {icon && <Icon name={icon} color="black" style={styles.icon} size={24} />}
      {thumbnail && <Image source={thumbnail} style={styles.thumbnail} />}
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </View>
  );
};
