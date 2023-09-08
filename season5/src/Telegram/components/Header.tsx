import { useTheme } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

import { Text, type Theme } from "../../components";

import { Avatar } from "./Avatar";

export const Header = () => {
  const theme = useTheme<Theme>();
  const { colorScheme } = theme;
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
        padding: theme.spacing.m,
        flexDirection: "row",
      }}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Avatar id="derek.russel" />
      <Text variant="header" marginLeft="s">
        Chats
      </Text>
    </View>
  );
};
