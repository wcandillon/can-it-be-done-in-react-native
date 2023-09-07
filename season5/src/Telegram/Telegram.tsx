import type {
  DrawerActionHelpers,
  ParamListBase,
} from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View } from "react-native";
import { useTheme } from "@shopify/restyle";

import { useColorScheme, type Theme } from "../components";

export const Telegram = () => {
  const { toggle } = useColorScheme();
  const navigation = useNavigation() as DrawerActionHelpers<ParamListBase>;
  const theme = useTheme<Theme>();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.mainBackground,
        justifyContent: "center",
      }}
    >
      <Button onPress={() => navigation.openDrawer()} title="Open drawer" />
      <Button
        onPress={() => {
          toggle();
        }}
        title="Switch"
      />
    </View>
  );
};
