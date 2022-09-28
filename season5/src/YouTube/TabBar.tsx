import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Feather";

const { width } = Dimensions.get("window");
const color = "#3a3b3c";
const size = 28;

export const TabBar = ({}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        height: 64 + bottom,
        width,
        backgroundColor: "white",
        flexDirection: "row",
        padding: 16,
        justifyContent: "space-between",
      }}
    >
      <Icon name="home" size={size} color={color} />
      <Icon name="film" size={size} color={color} />
      <Icon name="plus-circle" size={size} color={color} />
      <Icon name="grid" size={size} color={color} />
      <Icon name="book" size={size} color={color} />
    </View>
  );
};
